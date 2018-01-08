# standard-redirects-for-cloudfront

A Lambda@Edge function that implements standard web server redirects that simplify directory handling. 

For example, requests for URI paths that end in "/" are rewritten into "/index.html" before the request is passed on to the CloudFront Origin. You may think of that as an "internal" redirect in webserver terms.

URI paths that end in ".../index.html" are redirected to ".../" with an HTTP status code 301 (Moved Permanently). This is the same as an "external" redirect by a webserver.

URI paths that do not have an extension and do not end with a "/" are redirected to the same path with an appended "/" with an HTTP status code 301 (Moved Permanently). This is again an "external" redirect. (This may hide actual content from the Origin, if you use paths without extensions!).

## Examples

  /foo/bar/ -> internal redirect -> /foo/bar/index.html  
  /foo -> external redirect (301) -> /foo/ -> internal redirect -> /foo/index.html  
  /foo.html -> no redirect  
  /foo/bar.html -> no redirect  
  /foo/index.html -> external redirect (301) -> /foo/  

## Notes

This URL scheme is somewhat opinionated. It tries to balance SEO requirements with server-side tooling. (E.g. S3 tooling tries to infer the content-type from the file extension.)

It allows you to have very nice outward facing URLs like "/cooltopic", that internally use a file with a correct extension: "cooltopic/index.html". To have content other than index.html in a folder, you need to expose the file extension: "/cooltopic/somecontent.html"

Make sure that your CloudFront distribution handles the URL "/" directly by having the property "Default Root Object" set to "index.html".

## Installation

### Installation via the Serverless Application Repository

1. Install the application "standard-redirects-for-cloudfront".
2. Go to the Cloudformation Console
3. Select the created role (which brings you to the IAM console)
4. edit the trust relationship, set the policy to:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com",
          "edgelambda.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

(This allows CloudFront to execute this function as a Lambda@Edge function.)

5. Select the Output Value, this is the ARN (including the version) for the Lambda function.
6. In CloudFront edit a **Behaviour** and add a **Lambda Function Association** of type "Event Type" and enter the Lambda function ARN from the previous step.
7. Wait for the CloudFront distribution to deploy.


### Manual installation

1. Create a function called "LATE-standard-redirects-for-cloudfront" in N. Virginia (us-east-1)
2. Run "npm run deploy"

This function assumes that your CloudFront distribution handles the URL "/" directly by having the property "Default Root Object"
set to "index.html". 

### Contact

For any questions or comments, do contact us!

Email: contact@digital-sailors.de  
Web: https://www.digital-sailors.de/

Enjoy!