# standard-redirects-for-cloudfront

A Lambda@Edge function that implements standard web server redirects:

URIs ending with a slash (e.g. "/something/") are "internally" redirected to "/something/index.html".

URIs without a suffix (and not ending with a slash) will redirect with an HTTP status 301 Moved Permanently to the same URL with a slash appended.
