## Guide to deploy the app to Vercel

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

## Guide to deploy the app to AWS Amplify

### Create the IAM user to get credential to deploy app to Amplify

1. Create user

- User name: eg. *AllowConnectToAmplify* / Next
- Permission options: select *Attach policies directly*
    + Select *AdministratorAccess-Amplify* policy / Next / Create

3. Create *access key*

- Go to *AllowConnectToAmplify* user / *Security credentials* / *Access keys* section / *Create access key*

    ```
    Access key: eg. *AKIAQSOI4OKLTVDGKL53*
    Secret access key: eg. *6UgHSWKAS2lD35D3tZAt70tBiBxT2GdkVbp/6w1D*
    ```

4. Copy *access key* and *secret access key* to GitHub secrets

    ```
    AWS_ACCESS_KEY: "AKIAQSOI4OKLTVDGKL53"
    AWS_SECRET_ACCESS_KEY: "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"
    ```

5. Create GitHub variables

    + AWS_REGION: "ap-southeast-1"
    
### Create the Amplify app

- Go to *https://ap-southeast-1.console.aws.amazon.com/amplify/create/add-repo* / select *Deploy without Git* / Next
    + App name: eg. mijo
    + Branch name: eg. main
    + Method: eg. S3
        - S3 location of objects to host (eg. s3://<bucket-name> to contains the artifacts after building)

- p/s: We should copy the *App ID* and *App Branch Name* to GitHub secrets

    + AMPLIFY_APP_ID: "d1kkyo5238akgj"
    + AMPLIFY_BRANCH_NAME: "main"
    + AWS_REGION: "ap-southeast-1"
    + AWS_BUCKET_NAME: "artifacts.bk"