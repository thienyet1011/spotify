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

### Create the Amplify Service Role

- Go to *IAM* / *Roles* / *Create role* / 
    + Trusted entity type: select *AWS Service*
        - Use case: selecy *Amplify* / Next

    + Role name: *AmplifyConsoleServiceRole-AmplifyRole* 

    + Select trusted entities:

    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "Service": "amplify.amazonaws.com"
                },
                "Action": "sts:AssumeRole",
                "Condition": {
                    "StringEquals": {
                        "aws:SourceAccount": "039612871319"
                    },
                    "ArnLike": {
                        "aws:SourceArn": "arn:aws:amplify:ap-southeast-1:039612871319:apps/*"
                    }
                }
            }
        ]
    }
    ```
    
### Create the Amplify app

- Go to *https://ap-southeast-1.console.aws.amazon.com/amplify/apps* / select *Deploy an app*
    + Choose source code provider: *GitHub* / Next / Sign in with GitHub account
    + Add repository and branch:
        - Select *<repository-name>* repository
        - Select *<branch-name>* branch

    + App settings
        - App name: eg. mijo
        - Frontend build command: ```yarn build```
        - Build output directory: ```.next```

    + Service role: select the role created before ```AmplifyConsoleServiceRole-AmplifyRole```
    + Advance settings:
        - Environment variables: ..
        - Live package updates:
            + Package: select ```yarn``` / Next / Save and deploy