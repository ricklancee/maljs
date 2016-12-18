import test from 'ava';
import toXml from './to-xml';

test('it is should be able to an object to xml', async t  => {
  const xml = toXml({
    foo: 'foo',
    bar: 'bar'
  });

  t.is(xml, '<?xml version="1.0" encoding="UTF-8"?><entry><foo>foo</foo><bar>bar</bar></entry>');
});

test('it is should be able to an array of objects to xml', async t  => {
  const xml = toXml([
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


