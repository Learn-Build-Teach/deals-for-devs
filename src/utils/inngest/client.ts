import { EventSchemas, Inngest } from "inngest";

type AdminNewDeal = {
  data: {
    dealId: string;
  };
};

type EmailAdminNewDeal = {
  data: {
    dealId: string;
    adminEmail: string;
  };
} 

type Events = {  
  "admin/new-deal-created": AdminNewDeal;
  "admin/email-new-deal": EmailAdminNewDeal;
};

export const inngest = new Inngest({
  id: "deals-for-devs",
  schemas: new EventSchemas().fromRecord<Events>()    
});
