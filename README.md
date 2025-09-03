# Cloudwijk - EU Sovereign AI Platform

**🚀 Getting Live in 2 Minutes**

Complete EU AI Act compliance platform with assessment checker, PDF reports, and admin dashboard. Production-ready with EU hosting, GDPR compliance, and full automation.

## ✨ What's Built

- **🛡️ AI Act Checker**: Complete assessment with juridically correct classification
- **📊 PDF Reports**: Branded reports with compliance roadmaps  
- **👥 Admin Dashboard**: Lead management, analytics, content management
- **📧 Email System**: Automated report delivery via Resend
- **🔒 GDPR Ready**: Export/delete endpoints, data retention policies
- **🌍 i18n Support**: Dutch/English with easy switching
- **⚡ Performance**: Core Web Vitals optimized, <90 score target
- **🔐 Security**: CSP headers, input sanitization, rate limiting

## 🎯 Quick Start (2 Steps)

### 1. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/cloudwijk)

### 2. Add Environment Variables

In your Vercel dashboard, add these **4 required** secrets:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key  
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
```

**That's it!** Your platform is live at `https://your-project.vercel.app`

## 🎛️ Setup Status

Visit `/admin/setup-status` to check configuration:
- ✅ **Required**: Database, Email API
- 🔧 **Optional**: Custom domain, analytics, monitoring

## 📋 Optional Configuration

```env
# Optional - enhances functionality
NEXTAUTH_SECRET=your_nextauth_secret_for_admin_auth
ADMIN_EMAILS=admin@cloudwijk.eu,admin2@cloudwijk.eu  
RESEND_FROM=noreply@yourdomain.com
SENTRY_DSN=your_sentry_dsn_for_error_monitoring
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 🏗️ Architecture

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes, TypeScript strict
- **Database**: Supabase (Postgres) with RLS policies  
- **Email**: Resend with shared sender by default
- **Auth**: NextAuth.js for admin access
- **Analytics**: Vercel Analytics (privacy-friendly)
- **Monitoring**: Optional Sentry integration

## 📊 Features

### AI Act Checker
- Complete EU regulation 2024/1689 coverage
- All 8 high-risk categories (Annex III)  
- Prohibited practices detection (Art. 5)
- Role-specific obligations (provider/deployer/etc)
- GPAI model requirements (Art. 51-55)
- Exception handling (Art. 6.3)

### PDF Reports  
- Executive summary with risk classification
- Gap analysis with priorities (critical/high/medium)
- Implementation roadmap with timelines
- Compliance requirements by article
- Branding with disclaimers in footer

### Admin Dashboard
- Lead management with scoring
- Assessment analytics and filtering
- Content management for questions/emails
- Setup status monitoring
- GDPR export/delete functionality

## 🔒 Security & Privacy

- **CSP Headers**: Strict content security policies
- **Input Sanitization**: All user inputs cleaned
- **Rate Limiting**: IP-based request limiting  
- **Audit Logging**: Admin actions tracked
- **Data Retention**: 90-day automatic cleanup
- **GDPR Compliance**: Export/delete endpoints

## 🌍 Multi-language

- **Default**: Dutch (primary market)
- **Toggle**: English support  
- **Easy Extension**: Add languages via `/lib/i18n/`

## 📈 Analytics & Monitoring

- **Vercel Analytics**: Privacy-friendly, built-in
- **Custom Events**: Lead conversions, report downloads
- **Error Tracking**: Optional Sentry integration
- **Health Checks**: `/api/health` endpoint

## 🛠️ Local Development  

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Run development server  
npm run dev

# Database setup (if using local Supabase)
npm run db:reset
npm run db:seed
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📚 API Routes

- `POST /api/assessments` - Save assessment results
- `GET /api/assessments?id=` - Retrieve assessment  
- `POST /api/leads` - Create/update leads
- `POST /api/report/generate` - Generate PDF report
- `POST /api/email` - Send emails (reports, notifications)
- `POST /api/contact` - Handle contact form
- `GET /api/health` - Health check endpoint

## 🗄️ Database Schema

```sql
-- Core tables
leads (email, name, company, marketing_consent, lead_score)
assessments (lead_id, risk_category, compliance_score, answers, report_data)
email_events (lead_id, type, status, metadata)
analytics_events (session_id, event_name, properties)
audit_logs (action, user_email, metadata)
```

## 🚀 Deployment

**Vercel** (Recommended):
- Automatic deployments from GitHub
- Environment variables in dashboard
- Edge functions for optimal performance

**Alternative Platforms**:
- Netlify, Railway, or any Node.js host
- Requires Postgres database (Supabase/PlanetScale/etc)
- Email service (Resend/SendGrid/etc)

## 📄 Legal Compliance

- **EU AI Act**: Based on regulation 2024/1689
- **GDPR**: Full compliance with data protection
- **Disclaimers**: Educational tool, not legal advice
- **Updates**: Maintained with regulatory changes

## 🆘 Support

- **Documentation**: Check `/docs` folder
- **Issues**: GitHub Issues for bugs
- **Discord**: Community support channel
- **Email**: technical@cloudwijk.eu

## 📝 License

MIT License - see LICENSE file

---

**Built with ❤️ for European AI compliance**

*Radio Kootwijk (1918) made NL independent from British cables.  
Cloudwijk (2024) makes Europe independent from US AI platforms.*