import test from 'ava';
import parser from './node';
import fs from 'fs';

import {
  xmlString,
  jsonData,
  animeObject,
  animeXml,
  listXml,
  listXmlSingle,
  listObject,
  listObjectSingle
} from '../datastub';

test('it is should be able to convert xml to a javascript object', async t  => {
  const p = parser();
  const object = await p.toJson(xmlString);

  t.deepEqual(object, jsonData);
});

test('it is should be able to convert a xml with different children to a javascript object (animelist)', async t  => {
  const p = parser();
  const object = await p.toJson(listXml);

  t.deepEqual(object, listObject);
});

test('it is should be able to convert a xml with different children but a single anime entry to an array (animelist)', async t  => {
  const p = parser();
  const object = await p.toJson(listXmlSingle);
  t.deepEqual(object, listObjectSingle);
});

test('it is should be able to convert a javascript object to a xml string', async t  => {
  const p = parser();
  const xml = await p.toXml(animeObject);

  t.is(xml, animeXml);
});
