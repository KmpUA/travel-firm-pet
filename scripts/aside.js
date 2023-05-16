const newsPanel = document.createElement('aside');
const asideWrapper = document.querySelector('.aside-wrapper');
newsPanel.classList.add('news-panel');

const heading = document.createElement('h2');
heading.textContent = 'Останні новини';
heading.style.fontSize = '1.5em'
newsPanel.appendChild(heading);

const newsDetails = [
  {
    date: '18 квітня, 2023',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum metus purus, id auctor odio ultricies et. Praesent luctus imperdiet sapien, eget congue nisi accumsan ac. Donec lobortis condimentum suscipit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse potenti. Maecenas sed elementum risus. Vivamus ac risus nisl. Pellentesque laoreet lorem vitae pellentesque imperdiet. Fusce vel mauris orci. Aenean nec sem et felis commodo fermentum sed eget lectus. Curabitur fermentum euismod dolor. Nullam nec commodo nisi. Aenean in velit in risus aliquam accumsan sed nec lacus. ',
    imageUrl: './images/4.jpg'
  },
  {
    date: '17 квітня, 2023',
    content: 'Duis semper ipsum est, a interdum lacus viverra faucibus. Pellentesque rhoncus elit et odio bibendum, sit amet consequat tortor porta. Ut quam lectus, pellentesque vitae risus in, hendrerit imperdiet tortor. Phasellus vehicula mollis nisi, non varius diam tincidunt et. Vestibulum non urna ut elit volutpat pellentesque. Nunc porttitor varius felis efficitur fermentum. Etiam at porta diam. Cras eget purus libero. Praesent vel nibh a arcu vulputate hendrerit porttitor quis ligula. ',
    imageUrl: './images/2.jpg'
  },
  {
    date: '16 квітня, 2023',
    content: 'Donec cursus tellus in velit varius, vitae ullamcorper nibh auctor. Quisque finibus erat eget tristique vestibulum. Nunc rutrum efficitur tortor eget accumsan. Duis nec dictum purus. Nulla arcu eros, condimentum vulputate aliquam id, ultrices eu ante. Nunc mauris purus, varius nec eros eu, eleifend egestas libero. Integer sed erat eleifend, placerat leo quis, maximus eros. Mauris gravida, nisl eu vehicula porttitor, justo leo feugiat metus, at bibendum augue nunc at dui. Maecenas in luctus nulla. Aliquam porta turpis maximus magna egestas lobortis. Etiam ut maximus tortor. Mauris quis sem tortor. Nullam ipsum nisl, vulputate quis nibh nec, consectetur elementum velit. Vestibulum pulvinar ante vitae tellus porttitor egestas. Ut rhoncus eget mi ac aliquet. In in mi risus. ',
    imageUrl: './images/3.jpg'
  }
];

newsDetails.forEach(detail => {
  const summary = document.createElement('summary');
  summary.classList.add('news-summary');
  summary.textContent = detail.date;
  summary.style.fontSize = '1em';

  const content = document.createElement('div');
  content.classList.add('news-content');

  const text = document.createElement('p');
  text.textContent = detail.content;
  content.appendChild(text);

  if (detail.imageUrl) {
    const image = document.createElement('img');
    image.src = detail.imageUrl;
    content.appendChild(image);
  }

  const details = document.createElement('details');
  details.classList.add('news-details');
  details.appendChild(summary);
  details.appendChild(content);

  newsPanel.appendChild(details);
  let flag = 0;
  summary.addEventListener('click', () => {
    if (window.innerWidth > 600) {
      const currentTopic = document.createElement('div');
      currentTopic.classList.add('current-topic');
      currentTopic.style.display = 'flex';
      currentTopic.style.alignItems = 'center';
      currentTopic.style.flexDirection = 'column';
      currentTopic.innerHTML = `
        <h3 style="font-size:3em;">${detail.date}</h3>
        <p style="inline-size:50vw">${detail.content}</p>
        ${detail.imageUrl ? `<img src="${detail.imageUrl}" style="width: 40vw; heigth: 40vw;" alt="news image">` : ''}
      `;
      const previousTopics = asideWrapper.querySelectorAll('.current-topic');
      previousTopics.forEach(topic => topic.remove());
      if(flag === 0){
        asideWrapper.prepend(currentTopic);
        asideWrapper.firstElementChild.nextElementSibling.style.display = 'none';
        flag = 1;
      }
      else{
        asideWrapper.firstElementChild.style.display = 'block';
        previousTopics.forEach(topic => topic.remove());
        flag = 0;
      }
    }
  });
});
asideWrapper.append(newsPanel);
