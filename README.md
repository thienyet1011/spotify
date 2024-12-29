### Config the Vercel project

```
npm install --global vercel

vercel login
    => Continue with GitHub
    => Continue with GitLab
    => Continue with Bitbucket
    => Continue with Email
    => Continue with SAML Single Sign-On

vercel link
    => Set up "~/Downloads/spotify"? y
    => Which scope should contain your projects? hoanglong1011's project
    => Link to existing project? n
    => What's your project's name? spotify
    => In which directory is your code located? ./
    => Want to modify these settings? n
```

### Config the Vercel

#### Generate Vercel token

- Go to Vercel *Account Settings* / *Tokens* / *Create Token*
    + **TOKEN NAME**: eg. GitHub Action Deployment
    + **SCOPE**: eg. Full Accounts
    + **EXPIRATION**: eg. No Expiration / *Create*

#### Setup the project *Environment Variables*

- Go to *Dashboard* / select *spotify* project / *Settings*
    + *Environment Variables* / *Create New* tab

1. **Preview** environment

    - Select *Preview* environment

        ```
        NEXT_PUBLIC_SUPABASE_URL=
        NEXT_PUBLIC_SUPABASE_ANON_KEY=
        SUPABASE_SERVICE_ROLE_KEY=
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
        STRIPE_SECRET_KEY=
        STRIPE_WEBHOOK_SECRET=
        NEXT_PUBLIC_GTM_ID=
        ```

2. **Production** environment

    - Select *Production* environment

        ```
        NEXT_PUBLIC_SUPABASE_URL=
        NEXT_PUBLIC_SUPABASE_ANON_KEY=
        SUPABASE_SERVICE_ROLE_KEY=
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
        STRIPE_SECRET_KEY=
        STRIPE_WEBHOOK_SECRET=
        NEXT_PUBLIC_GTM_ID=
        ```

### Config the GitHub secrets

1. Config *Repository secrets*

    - Go to *Repository Settings* / *Secrets and Variables* / *New repository secret*

        ```
        VERCEL_ORG_ID=
        VERCEL_PROJECT_ID=
        VERCEL_TOKEN=
        ```