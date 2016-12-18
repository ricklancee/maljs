import test from 'ava';
import sinon from 'sinon';
import parser from './node';

import {xmlString, jsonData, animeObject, animeXml} from '../datastub';

test('it is should be able to convert xml to a javascript object', async t  => {
  const p = parser();
  const object = await p.toJson(xmlString);

  t.deepEqual(object, jsonData);
});

test('it is should be able to convert a javascript object to a xml string', async t  => {
  const p = parser();
  const xml = await p.toXml(animeObject);

  t.is(xml, animeXml);
});

test('it is should be able to an array of object to xml', async t  => {
  const p = parser();
  const xml = await p.toXml([
    {
      foo: 'foo',
      bar: 'bar'
    },
    {
      baz: 'baz'
    }
  ]);

  t.is(xml, '<?xml version="1.0" encoding="UTF-8"?><entry><foo>foo</foo><bar>bar</bar></entry><entry><baz>baz</baz></entry>');
});
