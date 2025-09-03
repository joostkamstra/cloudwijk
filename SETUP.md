# Cloudwijk Setup Guide

Get your EU AI Act platform live in 2 minutes.

## 🚀 Quick Deployment

### Step 1: Deploy to Vercel

1. Click: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/cloudwijk)
2. Connect your GitHub account
3. Import the repository 
4. Choose a project name (e.g., `cloudwijk-prod`)

### Step 2: Add Environment Variables

In your Vercel project dashboard → Settings → Environment Variables:

#### Required (4 variables):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here  
RESEND_API_KEY=re_your_resend_api_key_here
```

#### Optional (enhance functionality):
```env
NEXTAUTH_SECRET=your_random_secret_for_admin_login
ADMIN_EMAILS=admin@yourcompany.com,admin2@yourcompany.com
RESEND_FROM=noreply@yourdomain.com
SENTRY_DSN=https://your_sentry_dsn_here
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Step 3: Database Setup

1. Go to [Supabase](https://supabase.com)
2. Create new project
3. Go to SQL Editor
4. Copy & paste `/supabase/migrations/20240101000000_initial_schema.sql`
5. Run the migration
6. Copy your project URL and keys to Vercel

### Step 4: Email Setup  

1. Go to [Resend](https://resend.com)
2. Create account and get API key
3. Add API key to Vercel environment variables
4. (Optional) Verify your sending domain

**That's it! Your platform is live.**

## 🔧 Advanced Configuration

### Custom Domain (Optional)

1. In Vercel: Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable

### Admin Access

1. Set `ADMIN_EMAILS` environment variable
2. Visit `/admin` on your live site
3. Sign in with Google/GitHub (any OAuth provider)
4. Only emails in `ADMIN_EMAILS` get admin access

### Monitoring (Optional)

1. Create [Sentry](https://sentry.io) project
2. Add `SENTRY_DSN` to environment variables
3. Error tracking and performance monitoring enabled

## 🏥 Health Check

Visit `https://your-site.vercel.app/admin/setup-status` to verify:

- ✅ **Database**: Connection working
- ✅ **Email**: Resend configured  
- ✅ **Environment**: All required vars set
- ✅ **Features**: Core functionality enabled

## 🎯 Testing Your Setup

### 1. AI Act Checker
- Visit `/ai-act-checker`
- Complete a test assessment
- Verify email delivery
- Check PDF generation

### 2. Admin Dashboard
- Login at `/admin` 
- View test lead in dashboard
- Check assessment analytics
- Verify data export functions

### 3. Contact Form
- Fill out `/contact` form
- Verify email notification received
- Check lead appears in admin

## 🐛 Troubleshooting

### "Database connection failed"
- Check `NEXT_PUBLIC_SUPABASE_URL` format
- Verify `SUPABASE_SERVICE_ROLE_KEY` is service role key (not anon key)
- Ensure database migration was run

### "Email sending failed"  
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for sending limits
- Ensure sender domain is verified (if using custom domain)

### "Admin access denied"
- Check `ADMIN_EMAILS` format (comma-separated)
- Clear browser cache and try again
- Verify OAuth provider is configured

### "PDF generation error"
- Check browser console for JavaScript errors
- Verify assessment completed fully
- Check database logs in Supabase

## 📊 Monitoring & Analytics

### Built-in Analytics
- **Vercel Analytics**: Automatic page views, performance
- **Custom Events**: Lead conversions, assessment completions
- **Database Metrics**: Lead scoring, risk distributions

### Optional Monitoring
- **Sentry**: Error tracking, performance monitoring
- **Supabase**: Database performance, query analysis
- **Resend**: Email delivery rates, bounces

## 🔒 Security Configuration

### Required
- CSP headers (automatic)
- Input sanitization (automatic)  
- Rate limiting (automatic)

### Optional
- Custom security headers
- IP allowlisting for admin
- Additional rate limit rules

## 📱 Mobile & Performance

### Automatic
- Mobile-responsive design
- Core Web Vitals optimization
- Progressive enhancement

### Customization
- Update brand colors in `tailwind.config.js`
- Replace logo files in `/public`
- Modify content in i18n files

## 🌍 Internationalization

### Adding Languages
1. Create `/lib/i18n/fr.ts` (example for French)
2. Copy structure from `nl.ts`
3. Translate all strings
4. Add to `config.ts` locales array
5. Update language toggle component

### Content Management
- All text in `/lib/i18n/` files
- Easy updates without code changes
- Consistent translations across platform

## 🚀 Going to Production

### Pre-launch Checklist
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Email sending domain verified  
- [ ] Admin access tested
- [ ] Full assessment flow tested
- [ ] PDF generation working
- [ ] Email delivery confirmed
- [ ] Error monitoring enabled
- [ ] Analytics tracking verified
- [ ] GDPR compliance reviewed
- [ ] Legal disclaimers updated

### Launch Day
1. Announce platform availability
2. Monitor error rates in Sentry
3. Check email delivery rates
4. Track conversion metrics
5. Monitor database performance

## 📞 Support

### Self-Service
- Check `/admin/setup-status` for config issues
- Review browser console for client errors
- Check Vercel deployment logs
- Verify environment variables

### Community
- GitHub Issues for bugs/features
- Discord community for questions
- Documentation updates via PR

### Professional
- Email: support@cloudwijk.eu
- Priority support available for enterprise
- Custom implementation services

---

**Need help? Check the troubleshooting section above or open a GitHub issue.**