'use strict';

/*
  Copyright 2017 DigitalSailors e.K.

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

const assert = require('assert');

const index = require('../index.js');

describe('Testing index.js', function() {
  it('/ -> no redirect', function(done) {
    const event = {
      Records:[{ cf: {
          request:  {
            uri: '/'
          }
        } }] };
    index.handler(event, {}, (err, data) => {
      done(assert(data.uri === '/'));
    });
  });

  it('/foo/ -> internal redirect -> /foo/index.html', function(done) {
    const event = {
      Records:[{ cf: {
          request:  {
            uri: '/foo/'
          }
        } }] };
    index.handler(event, {}, (err, data) => {
      done(assert.strictEqual(data.uri, '/foo/index.html'));
    });
  });

  it('/foo/bar/ -> internal redirect -> /foo/bar/index.html', function(done) {
    const event = {
      Records:[{ cf: {
          request:  {
            uri: '/foo/bar/'
          }
        } }] };
    index.handler(event, {}, (err, data) => {
      done(assert.strictEqual(data.uri, '/foo/bar/index.html'));
    });
  });
  
  it('/foo -> external redirect (301) -> /foo/', function(done) {
    const event = {
      Records:[{ cf: {
          request:  {
            uri: '/foo'
          }
        } }] };
    index.handler(event, {}, (err, data) => {
      done(assert.strictEqual(data.status, '301') 
          || assert.strictEqual(data.headers.location[0].key, 'Location')
          || assert.strictEqual(data.headers.location[0].value, '/foo/'));
    });
  });

  it('/foo.html -> no redirect', function(done) {
    const event = {
      Records:[{ cf: {
          request:  {
            uri: '/foo.html'
          }
        } }] };
    index.handler(event, {}, (err, data) => {
      done(assert.strictEqual(data.uri, '/foo.html'));    });
  });

  it('/foo/bar.html -> no redirect', function(done) {
    const event = {
      Records:[{ cf: {
          request:  {
            uri: '/foo/bar.html'
          }
        } }] };
    index.handler(event, {}, (err, data) => {
      done(assert.strictEqual(data.uri, '/foo/bar.html'));    });
  });

  it('/foo/index.html -> external redirect (301) -> /foo/', function(done) {
    const event = {
      Records:[{ cf: {
          request:  {
            uri: '/foo/index.html'
          }
        } }] };
    index.handler(event, {}, (err, data) => {
      done(assert.strictEqual(data.status, '301') 
          || assert.strictEqual(data.headers.location[0].key, 'Location')
          || assert.strictEqual(data.headers.location[0].value, '/foo/'));
    });
  });
});