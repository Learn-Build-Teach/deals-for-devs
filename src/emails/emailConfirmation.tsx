import { Html, Head, Preview, Body, Text, Link } from '@react-email/components'
import { Tailwind } from '@react-email/components'

interface EmailTemplateProps {
	email: string
	link: string
}

export default function EmailConfirmationTemplate(props: EmailTemplateProps) {
	return (
		<Html lang='en'>
			<Head />
			<Preview>
				You've subscribed to Deals for Devs Monthly Notifications!
			</Preview>
			<Tailwind>
				<Head />
				<Body className=' bg-white text-black'>
					<div className='w-full'>
						<Text className='font-sans '>Hello, {props.email}!</Text>
						<Text className='font-sans'>
							You've subscribed to the Deals for Devs Monthly Notifications!
						</Text>
						<Text className='font-sans'>
							To confirm your subscription, please click the link below:
						</Text>
						<Link href={props.link}>{props.link}</Link>
						<Text className='font-sans'>
							<strong>{`James Q Quick`}</strong>
						</Text>
					</div>
				</Body>
			</Tailwind>
		</Html>
	)
}
