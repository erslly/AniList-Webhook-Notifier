import axios from 'axios';
import fetch from 'node-fetch';

const query = `
query {
  Media(type: ANIME, status: RELEASING, sort: UPDATED_AT_DESC) {
    id
    title {
      english
      romaji
    }
    siteUrl
    coverImage {
      large
    }
    nextAiringEpisode {
      episode
      airingAt
    }
  }
}
`;

const discordWebhookURL = 'https://discord.com/api/webhooks/1295107867057197079/kzSPVurz6z3V5LStjTczjYxMYtFau5fY8RY3A8fyxqKDwF2hhxkWCUWCafJDvFS5JSuh';

async function sendDiscordMessage(animeTitle, episodeNumber, releaseDate, animeUrl, animeImage) {
  const messagePayload = {
    embeds: [
      {
        title: `Yeni Bir Anime Bölümü Geliyor!`,
        description: `**${animeTitle}**'nin yeni bölümü çok yakında!`,
        color: 0x1e90ff, 
        fields: [
          {
            name: 'Bölüm Numarası',
            value: `${episodeNumber}`,
            inline: true,
          },
          {
            name: 'Yayın Zamanı',
            value: `<t:${releaseDate}:R>`,
            inline: true,
          },
        ],
        thumbnail: {
          url: animeImage, 
        },
        footer: {
          text: 'Developed By Erslly',
        },
        timestamp: new Date(),
      },
    ],
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            label: 'Animeyi İzle',
            style: 5, 
            url: animeUrl, 
          },
        ],
      },
    ],
  };

  await fetch(discordWebhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messagePayload),
  });

  console.log(`Discord'a embed ve buton mesaj gönderildi: ${animeTitle} - Bölüm: ${episodeNumber}`);
}

async function checkForNewEpisodes() {
  try {
    const response = await axios.post('https://graphql.anilist.co/', {
      query: query,
    });

    const animeData = response.data.data.Media;

    if (animeData && animeData.nextAiringEpisode) {
      const episodeNumber = animeData.nextAiringEpisode.episode;
      const airingAt = animeData.nextAiringEpisode.airingAt;
      const animeTitle = animeData.title.english || animeData.title.romaji;
      const animeUrl = animeData.siteUrl;
      const animeImage = animeData.coverImage.large; 

      await sendDiscordMessage(animeTitle, episodeNumber, airingAt, animeUrl, animeImage);
    } else {
      console.log('Yeni bir bölüm bulunamadı.');
    }
  } catch (error) {
    console.error('Bir hata oluştu:', error);
  }
}

setInterval(checkForNewEpisodes, 10 * 60 * 1000);

checkForNewEpisodes();
