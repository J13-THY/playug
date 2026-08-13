import { Link } from 'react-router-dom'
import { DATA_TABLE } from '../data/privacyTable'

export default function PrivacyPage() {
  return (
    <div className="policy-wrap">
      <Link to="/games" className="policy-back">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Back to LudoChampion
      </Link>

      <div className="policy-header">
        <div className="policy-app-row">
          <div className="policy-app-icon">
            <img src="/dp.jpg" alt="LudoChampion" />
          </div>
          <div>
            <p className="policy-app-name">LudoChampion</p>
            <p className="policy-app-dev">GameStudio International</p>
          </div>
        </div>
        <h1 className="policy-title">Privacy Policy</h1>
        <p className="policy-updated">Last updated: May 31, 2026 &nbsp;·&nbsp; Effective: June 1, 2026</p>
      </div>

      <div className="policy-section">
        <div className="policy-highlight">
          <p>GameStudio International ("we", "us", or "our") is committed to protecting your privacy. This policy explains what data we collect, why we collect it, and how you can control it when you use LudoChampion.</p>
        </div>
      </div>

      <div className="policy-section">
        <h2>1. Information We Collect</h2>
        <p>We collect the following categories of information when you use LudoChampion:</p>
        <table className="policy-data-table">
          <thead>
            <tr><th>Category</th><th>Examples</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            {DATA_TABLE.map(([cat, ex, pur]) => (
              <tr key={cat}><td><strong>{cat}</strong></td><td>{ex}</td><td>{pur}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {[
        {
          title: '2. How We Use Your Information',
          body: (
            <>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Operate, maintain, and improve LudoChampion</li>
                <li>Personalise your gaming experience and recommendations</li>
                <li>Process payments and restore in-app purchases</li>
                <li>Power leaderboards, achievements, and multiplayer matchmaking</li>
                <li>Send important service notifications (e.g. account security alerts)</li>
                <li>Send promotional communications — only if you have opted in</li>
                <li>Detect and prevent cheating, fraud, and abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p>We do <strong>not</strong> sell your personal information to third parties.</p>
            </>
          ),
        },
        {
          title: '3. Data Linked to You',
          body: (
            <ul>
              <li><strong>Contact Info</strong> — email address used for account recovery and notifications</li>
              <li><strong>User Content</strong> — profile photos, usernames, chat messages you create</li>
              <li><strong>Identifiers</strong> — your unique player ID and device identifiers</li>
              <li><strong>Purchase History</strong> — items bought inside the game</li>
            </ul>
          ),
        },
        {
          title: '4. Data Used to Track You',
          body: (
            <>
              <ul>
                <li><strong>User Content</strong> — aggregated behavioural data used for ad personalisation</li>
              </ul>
              <p>You can opt out in <strong>Settings → Privacy → Ad Preferences</strong> or through your device settings.</p>
            </>
          ),
        },
        {
          title: '5. Data Not Linked to You',
          body: (
            <ul>
              <li><strong>Usage Data</strong> — aggregated statistics on how features are used</li>
              <li><strong>Diagnostics</strong> — anonymised crash reports and performance metrics</li>
            </ul>
          ),
        },
        {
          title: '6. Sharing Your Information',
          body: (
            <ul>
              <li><strong>Service Providers</strong> — cloud hosting, payment processors, analytics platforms</li>
              <li><strong>Legal Requirements</strong> — when required by law or governmental authority</li>
              <li><strong>Business Transfers</strong> — in connection with a merger, acquisition, or asset sale</li>
              <li><strong>Safety</strong> — to protect the rights or safety of users</li>
            </ul>
          ),
        },
        {
          title: '7. Data Retention',
          body: <p>We retain your data while your account is active. You may request deletion via <strong>Settings → Account → Delete Account</strong>. Transaction records may be kept up to 7 years for compliance.</p>,
        },
        {
          title: "8. Children's Privacy",
          body: <p>LudoChampion is rated <strong>13+</strong>. We do not knowingly collect data from children under 13. Contact us immediately if you believe a child has provided information without parental consent.</p>,
        },
        {
          title: '9. Security',
          body: <p>We use TLS encryption in transit, encrypted storage, and access controls. No transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>,
        },
        {
          title: '10. Your Rights',
          body: (
            <>
              <ul>
                <li><strong>Access</strong> — request a copy of data we hold about you</li>
                <li><strong>Correction</strong> — request correction of inaccurate data</li>
                <li><strong>Deletion</strong> — request deletion ("right to be forgotten")</li>
                <li><strong>Portability</strong> — receive your data in a machine-readable format</li>
                <li><strong>Objection</strong> — object to certain uses of your data</li>
                <li><strong>Withdraw Consent</strong> — withdraw consent for marketing at any time</li>
              </ul>
              <p>To exercise these rights contact <a href="mailto:privacy@gamestudio.com">privacy@gamestudio.com</a>.</p>
            </>
          ),
        },
        {
          title: '11. Third-Party Links & Services',
          body: <p>LudoChampion may link to third-party websites or integrate third-party services. This policy does not cover those third parties — please review their policies before sharing information.</p>,
        },
        {
          title: '12. Changes to This Policy',
          body: <p>We may update this policy. Significant changes will be communicated via in-app notification or email. The "Last updated" date at the top reflects the most recent revision.</p>,
        },
      ].map(({ title, body }) => (
        <div key={title} className="policy-section">
          <h2>{title}</h2>
          {body}
        </div>
      ))}

      <div className="policy-section">
        <h2>13. Contact Us</h2>
        <div className="policy-contact-box">
          <h3>GameStudio International — Privacy Team</h3>
          <p>If you have any questions or requests regarding this Privacy Policy:</p>
          <p><strong>Email:</strong> <a href="mailto:privacy@gamestudio.com">privacy@gamestudio.com</a></p>
          <p><strong>Address:</strong> GameStudio International, 42 Kampala Road, Kampala, Uganda</p>
          <p><strong>Response time:</strong> We aim to respond within 14 business days.</p>
        </div>
      </div>
    </div>
  )
}
