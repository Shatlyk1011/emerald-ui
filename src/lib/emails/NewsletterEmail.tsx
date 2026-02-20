import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface NewsletterEmailProps {
  subject?: string
  previewText?: string
  content?: string
}

export const NewsletterEmail = ({
  subject = 'Newsletter Update',
  previewText = 'Latest news from Emerald UI',
  content = 'Hello! Here is your latest newsletter update.',
}: NewsletterEmailProps) => {
  return (
    <Html lang='en'>
      <Head>
        <title>{subject}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>Emerald UI</Text>
          </Section>

          {/* Content */}
          <Section style={contentSection}>
            <Text style={heading}>{subject}</Text>
            {content?.split('\n').map((line, i) => (
              <Text key={i} style={paragraph}>
                {line}
              </Text>
            ))}
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You received this email because you subscribed to our newsletter.
            </Text>
            <Text style={footerText}>
              <Link href='https://emerald-ui.com' style={link}>
                Visit Emerald UI
              </Link>
              {' · '}
              If you wish to unsubscribe, please contact us.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default NewsletterEmail

// --- Styles ---

const main: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}

const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
}

const header: React.CSSProperties = {
  padding: '24px 32px',
}

const logo: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#10b981',
  margin: '0',
}

const contentSection: React.CSSProperties = {
  padding: '0 32px',
}

const heading: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#1a1a1a',
  lineHeight: '1.4',
  margin: '16px 0',
}

const paragraph: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#4a4a4a',
  margin: '16px 0',
}

const hr: React.CSSProperties = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
}

const footer: React.CSSProperties = {
  padding: '0 32px',
}

const footerText: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '1.5',
  color: '#8898aa',
  margin: '4px 0',
}

const link: React.CSSProperties = {
  color: '#10b981',
  textDecoration: 'underline',
}
