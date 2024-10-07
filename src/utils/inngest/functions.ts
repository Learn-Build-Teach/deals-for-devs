import { inngest } from '@/utils/inngest/client'
import { env } from '@/env'
import { emailNewDealToAdmin } from '@/utils/resend/email-newDealAdminReview'
import { getAllAdminUsers } from '@/queries/adminUsers'
import { getDealByIdAsAdmin } from '@/queries/adminDeals'
import { RetryAfterError, StepError } from 'inngest'

export const processNewDeal = inngest.createFunction(
  { id: "proces-new-deal" },
  { event: "admin/new-deal-created" },
  async ({ event, step }) => {    
    const { dealId } = event.data;
    
    try {
      await step.run("Check that deal exists", async () => {
        const deal = await getDealByIdAsAdmin(dealId);
        if (!deal) {       
          throw new Error(`Deal not found: ${dealId}`);
        }
        return deal;
      });

      const adminUsers = await step.run("Get admin users", async () => {
        const users = await getAllAdminUsers();
        if (!users || users.length === 0) {
          throw new Error('No admin users found');
        }
        return users;
      });

      // Trigger email sending for each admin
      for (const admin of adminUsers) {
        try {
        await step.run(`Enqueue email for ${admin.email}`, async () => {
            await inngest.send({
              name: "admin/email-new-deal",
              data: { dealId, adminEmail: admin.email }
            });
            console.log(`Email event enqueued successfully for ${admin.email}`);
        });
      } catch (error) {
        console.error(`Failed to enqueue email event for ${admin.email}:`, error);            
        throw error;
        }
      }
      return { message: "Email sending triggered for admins" };
    } catch (error) {
      console.error('Error in processNewDeal:', error);
      throw error;
    }
  }
);

export const sendEmailToAdmin = inngest.createFunction(
  { 
    id: "email-new-deal-to-admin",
    throttle: {
      key: "admin-email-send",
      limit: 2,
      period: "1s"
    }
  },
  { event: "admin/email-new-deal" },
  async ({ event, step }) => {    
    const { dealId, adminEmail } = event.data;
    
    try {
      const { data, error } = await step.run("Send email", async () => {        
          const data  = await emailNewDealToAdmin(dealId, {
            to: adminEmail,
            from: `Deals for Devs <${env.FROM_EMAIL}>`,
            subject: 'New Deal To Review',
            resendAPIKey: env.RESEND_API_KEY,
            reply_to: env.REPLY_TO_EMAIL
          });
          return data;        
      });
      if (error) { throw error; }
      return { message: "Email sent successfully", id: data?.id };
    } catch (error: any) {   
      if (error instanceof RetryAfterError) {
        console.error(`Rate limited: ${error.message}`);
        throw error;
      } else if (error instanceof StepError) {
        console.error(`Step error: ${error.message}`);
        throw error;
      } else {
        console.error(`Error in sendEmailToAdmin: ${error.message}`);
        throw error;
    }
  } }
);