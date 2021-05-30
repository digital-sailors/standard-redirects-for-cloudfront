'use strict';

/*
  Copyright 2017-2021 DigitalSailors e.K.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;

  let prefixPath; // needed for 2nd condition

  if (request.uri.match('.+/$')) {
    request.uri += 'index.html';
    callback(null, request);
  } else if (prefixPath = request.uri.match('(.+)/index.html')) {
    const modifiedPrefixPath = prefixPath[1].replace(/^\/+/, '/');
    const response = {
      status: '301',
      statusDescription: 'Found',
      headers: {
        location: [{
          key: 'Location', value: modifiedPrefixPath + '/',
        }],
      }
    };
    callback(null, response);
  } else if (request.uri.match('/[^/.]+$')) {
    const modifiedRequestURI = request.uri.replace(/^\/+/, '/');
    const response = {
      status: '301',
      statusDescription: 'Found',
      headers: {
        location: [{
          key: 'Location', value: modifiedRequestURI + '/',
        }],
      }
    };
    callback(null, response);
  } else {
    callback(null, request);
  }
}