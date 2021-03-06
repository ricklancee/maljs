var MALjs = require('./mal');
var env = require('./env');
var it = require('./it');

var api = new MALjs(env.user, env.password);

var xmlString = `<?xml version="1.0" encoding="utf-8"?> <anime> <entry> <id>71</id> <title>Full Metal Panic!</title> <english>Full Metal Panic!</english> <synonyms>FMP; Fullmetal Panic!</synonyms> <episodes>24</episodes> <score>7.81</score> <type>TV</type> <status>Finished Airing</status> <start_date>2002-01-08</start_date> <end_date>2002-06-18</end_date> <synopsis>Equipped with cutting-edge weaponry and specialized troops, a private military organization named Mithril strives to extinguish the world's terrorism and all threats to peace on earth. The organization is powered by the &amp;quot;Whispered,&amp;quot; individuals who possess intuitive knowledge and the remarkable ability to create powerful devices and machinery.&lt;br /&gt; &lt;br /&gt; Seventeen-year-old Sousuke Sagara, a sergeant working for Mithril, has been assigned to protect Kaname Chidori, a Whispered candidate. He is ordered to join her high school class and be as close to her as possible to prevent her from falling into enemy hands&amp;mdash;that is, if he can safely blend in with their fellow classmates without revealing his true identity.&lt;br /&gt; &lt;br /&gt; Sousuke, who was raised on a battlefield and has very little knowledge of an average high school student's lifestyle, must adapt to a normal school life to safeguard Kaname. However, enemy forces have already begun making their move, and Sousuke is about to find out that the adversary coming for the Whispered girl may be a lot more familiar than he expects.&lt;br /&gt; &lt;br /&gt; [Written by MAL Rewrite]</synopsis> <image>https://myanimelist.cdn-dena.com/images/anime/2/75259.jpg</image> </entry> <entry> <id>72</id> <title>Full Metal Panic? Fumoffu</title> <english>Full Metal Panic? Fumoffu</english> <synonyms>Full Metal Panic Fumoffu; Fullmetal Panic? Fumoffu</synonyms> <episodes>12</episodes> <score>8.21</score> <type>TV</type> <status>Finished Airing</status> <start_date>2003-08-26</start_date> <end_date>2003-10-18</end_date> <synopsis>It's back-to-school mayhem with Kaname Chidori and her war-freak classmate Sousuke Sagara as they encounter more misadventures in and out of Jindai High School. But when Kaname gets into some serious trouble, Sousuke takes the guise of Bonta-kun&amp;mdash;the gun-wielding, butt-kicking mascot. And while he struggles to continue living as a normal teenager, Sousuke also has to deal with protecting his superior officer Teletha Testarossa, who has decided to take a vacation from Mithril and spend a couple of weeks as his and Kaname's classmate.&lt;br /&gt; &lt;br /&gt; (Source: ANN)</synopsis> <image>https://myanimelist.cdn-dena.com/images/anime/4/75260.jpg</image> </entry> <entry> <id>73</id> <title>Full Metal Panic! The Second Raid</title> <english>Full Metal Panic! The Second Raid</english> <synonyms>Full Metal Panic! TSR</synonyms> <episodes>13</episodes> <score>8.06</score> <type>TV</type> <status>Finished Airing</status> <start_date>2005-07-14</start_date> <end_date>2005-10-20</end_date> <synopsis>This series is set about two months after the events ocurred in the Tuatha de Danaan at the end of the original series. Mithril becomes aware of a secret organization that has technology able to counter the ECS (Electronic Cloaking System) mode. This organization, known as Amalgam, also has &amp;quot;Black Technology,&amp;quot; obtained from &amp;quot;Whispered&amp;quot; like Kaname Chidori, and like the other intelligence agencies, they intend to obtain more; however, when Sousuke's mission to protect Chidori is terminated by Mithril, all seems to be in place for Amalgam's plans...&lt;br /&gt; &lt;br /&gt; (Source: ANN)</synopsis> <image>https://myanimelist.cdn-dena.com/images/anime/11/75261.jpg</image> </entry> <entry> <id>121</id> <title>Fullmetal Alchemist</title> <english>Fullmetal Alchemist</english> <synonyms>Hagane no Renkinjutsushi; FMA; Full Metal Alchemist</synonyms> <episodes>51</episodes> <score>8.33</score> <type>TV</type> <status>Finished Airing</status> <start_date>2003-10-04</start_date> <end_date>2004-10-02</end_date> <synopsis>Edward Elric, a young, brilliant alchemist, has lost much in his twelve-year life: when he and his brother Alphonse try to resurrect their dead mother through the forbidden act of human transmutation, Edward loses his brother as well as two of his limbs. With his supreme alchemy skills, Edward binds Alphonse&amp;#039;s soul to a large suit of armor.&lt;br /&gt; &lt;br /&gt; A year later, Edward, now promoted to the fullmetal alchemist of the state, embarks on a journey with his younger brother to obtain the Philosopher&amp;#039;s Stone. The fabled mythical object is rumored to be capable of amplifying an alchemist&amp;#039;s abilities by leaps and bounds, thus allowing them to override the fundamental law of alchemy: to gain something, an alchemist must sacrifice something of equal value. Edward hopes to draw into the military&amp;#039;s resources to find the fabled stone and restore his and Alphonse&amp;#039;s bodies to normal. However, the Elric brothers soon discover that there is more to the legendary stone than meets the eye, as they are led to the epicenter of a far darker battle than they could have ever imagined.&lt;br /&gt; &lt;br /&gt; [Written by MAL Rewrite]</synopsis> <image>https://myanimelist.cdn-dena.com/images/anime/10/75815.jpg</image> </entry> <entry> <id>1015</id> <title>Full Metal Panic! The Second Raid: Wari to Hima na Sentaichou no Ichinichi</title> <english></english> <synonyms>The Commanding Officer's Rather Quiet Day; Full Metal Panic! The Second Raid Special; Full Metal Panic! The Second Raid OVA</synonyms> <episodes>1</episodes> <score>7.78</score> <type>Special</type> <status>Finished Airing</status> <start_date>2006-05-26</start_date> <end_date>2006-05-26</end_date> <synopsis>On her day off, Tessa wakes up in her commander chair. After regaining her composure, she notices that her favorite stuffed animal is missing and thus tries to remember what actually transpired the night before. To do so, she will spend time with all the main characters of the Danaan crew, and eventually recalls the events of the previous night.&lt;br /&gt; &lt;br /&gt; [Written by MAL Rewrite]</synopsis> <image>https://myanimelist.cdn-dena.com/images/anime/3/23458.jpg</image> </entry> <entry> <id>2601</id> <title>Juusenki L-Gaim III: Full Metal Soldier</title> <english></english> <synonyms>Heavy Metal L-Gaim OVA; Heavy Metal L-Gaim III: Full Metal Soldier</synonyms> <episodes>1</episodes> <score>6.50</score> <type>OVA</type> <status>Finished Airing</status> <start_date>1987-03-28</start_date> <end_date>1987-03-28</end_date> <synopsis>A side story taking place somewhere before the second half of the series, prior to Daba acquiring the L-Gaim Mk-II. Daba's comrade Leccee is captured by Poseidal's forces, and Daba and his rebels attempt to save her. </synopsis> <image>https://myanimelist.cdn-dena.com/images/anime/3/24615.jpg</image> </entry> <entry> <id>6291</id> <title>Full Metal Panic! The Second Raid Episode 000</title> <english></english> <synonyms>Full Metal Panic! The Second Raid Pre-festival: Night of the Light Novel</synonyms> <episodes>1</episodes> <score>7.55</score> <type>Special</type> <status>Finished Airing</status> <start_date>2005-07-06</start_date> <end_date>2005-07-06</end_date> <synopsis>Sousuke, Kurz and Melissa are deployed to the Republic of Manistan in Central Asia to eradicate a growing civil war between rebels and the Manistani military. &lt;br /&gt; &lt;br /&gt; (Source: Wikipedia)</synopsis> <image>https://myanimelist.cdn-dena.com/images/anime/9/45048.jpg</image> </entry> <entry> <id>31931</id> <title>Full Metal Panic! (Shinsaku)</title> <english></english> <synonyms></synonyms> <episodes>0</episodes> <score>7.48</score> <type></type> <status>Not yet aired</status> <start_date>2017-10-00</start_date> <end_date>0000-00-00</end_date> <synopsis>Jindai High School was a relatively safe place, right up until Sousuke Sagaka transferred there. A total nut, he wreaks havoc on the school&amp;#039;s student body and gets into a world of trouble with the teachers! But there&amp;#039;s more to Sousuke than meets the eye&amp;mdash;not just a hell-raising student, he&amp;#039;s actually a member of an elite military unit, on an undercover mission to protect the beautiful schoolgirl Kaname Chidori from the KGB. &lt;br /&gt; &lt;br /&gt; (Source: Tokyopop)</synopsis> <image>https://myanimelist.cdn-dena.com/images/anime/3/77141.jpg</image> </entry> </anime>`;

it('should be able to set the username and password', function() {
  console.log('username:', api._user, env.user);
  console.log('password:', api._password, env.password);
  if (
    api._user != env.user ||
    api._password != env.password
    ) {
    this.fail();
  }
  this.done();
});

it('should be able to convert MAL\'s xml to json', function() {
  api._xmlToJson(xmlString)
    .then(object => {
      console.log(object);
      if (
        !object.anime ||
        object.anime.length == 0 ||
        object.anime[0].id != 71
      ) {
        this.fail();
      }
      this.done();
    })
    .catch(this.fail);

});

it('should be able to convert xml to json', function() {
  var object = {
    episode: 1,
    status: 6,
    score: 7
  };

  var xmlString = api._toXml(object);

  console.log(xmlString);

  if (xmlString !== '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><episode>1</episode><status>6</status><score>7</score>') {
    this.fail();
  }
  this.done();
});

it('should be able to search an anime', function() {
  var searchString = 'bleach';

  api.anime.search(searchString).then(result => {
    console.log(result);

    if(!result.anime[0].id == 269) {
      this.fail();
    }
    this.done();

  }).catch(this.fail)
});

it('should be able to search an manga', function() {
  var searchString = 'bleach';

  api.manga.search(searchString).then(result => {
    console.log(result);

    if(!result.manga[0].id == 12) {
      this.fail();
    }

    this.done();
  }).catch(this.fail)
});

it('should be able to add, update and delete an anime to the list', function() {
  api.anime.add(269, {
    episode: 1,
    status: 6,
    score: 7
  }).then(result => {
    console.log('Anime', result);

    if(result !== 'Created') {
      this.fail();
    }

    api.anime.update(269, {
      episode: 2
    }).then(result => {
      console.log('Anime', result);

      api.anime.delete(269).then(result => {
        console.log('Anime', result);

        this.done();
      }).catch(this.fail);
    }).catch(this.fail);

  }).catch(this.fail);
}).then(_ => {
  it('should be able to list an users anime list', function() {
    api.anime.add(269, {
      episode: 1,
      status: 6,
      score: 7
    }).then(result => {
      console.log(result);

      if(result !== 'Created') {
        this.fail();
      }

      api.anime.list().then(list => {
        console.log(list);

        if (
          list.myanimelist.anime.length !== 1 ||
          list.myanimelist.anime[0].series_animedb_id != '269'
        ) {
          this.fail();
        }

        api.anime.delete(269);
        this.done();

      });
    }).catch(this.fail);
  });
});

it('should be able to add, update and delete an manga to the list', function() {
  api.manga.add(12, {
    chapter: 6,
    status: 6,
    volume: 1
  }).then(result => {
    console.log('manga', result);

    if(result !== 'Created') {
      this.fail();
    }

    api.manga.update(12, {
      chapter: 7
    }).then(result => {
      console.log('manga', result);

      api.manga.delete(12).then(result => {
        console.log('manga', result);

        this.done();
      }).catch(this.fail);
    }).catch(this.fail);

  }).catch(this.fail);
}).then(_ => {
  it('should be able to list an users manga list', function() {
    api.manga.add(12, {
      chapter: 6,
      status: 6,
      volume: 1
    }).then(result => {
      console.log(result);

      if(result !== 'Created') {
        this.fail();
      }

      api.manga.list().then(list => {
        console.log(list);

        if (
          list.myanimelist.manga.length !== 1 ||
          list.myanimelist.manga[0].series_mangadb_id != '12'
        ) {
          this.fail();
        }

        api.manga.delete(12);

        this.done();
      });
    }).catch(this.fail);
  });
});
