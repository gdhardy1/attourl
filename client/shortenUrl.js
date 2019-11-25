function getShort() {
  const xhr = new XMLHttpRequest();
  const longUrl = document.getElementById('link').value;
  const baseUrl = window.location.origin;

  xhr.open('POST', `${baseUrl}/api/url/shorten`);

  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.send(JSON.stringify({ longUrl }));

  xhr.onreadystatechange = function() {
    if (this.status == 201 && this.readyState === 4) {
      let { shortUrl, longUrl } = JSON.parse(this.response);

      let shortLinks = document.getElementById('shortLinks');
      let aTag = document.createElement('a');
      let span = document.createElement('span');
      let divTag = document.createElement('div');

      divTag.classList.add(
        'm-2',
        'pt-2',
        'pb-2',
        'max-w-2xl',
        'border',
        'border-gray-300',
        'rounded-lg',
        'p-4',
        'bg-gray-300',
        'sm:max-w-sm'
      );

      divTag.innerHTML = `<span class="block overflow-hidden">${longUrl}</span><a href="${shortUrl}" class="block overflow-hidden">${shortUrl}</a>`;
      x = '<button id="shorten" class="url-shortener__submit block bg-teal-500 hover:bg-teal-700 text-white font-bold mt-2 py-2 px-4 rounded-full">Copy</button>'
      // aTag.classList.add('overflow-hidden', 'block');
      // span.classList.add('overflow-hidden', 'mr-4');
      // aTag.setAttribute('href', shortUrl);
      // aTag.innerHTML = shortUrl;
      // span.innerHTML = longUrl;
      // divTag.appendChild(span);
      // divTag.appendChild(aTag);
      shortLinks.appendChild(divTag);
    }
  };
}

const shorten = document.getElementById('shorten');

shorten.addEventListener('click', getShort);
