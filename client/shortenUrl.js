function getShort() {
  const xhr = new XMLHttpRequest();
  const longUrl = document.getElementById('link').value;
  const baseUrl = window.location.origin;

  xhr.open('POST', `${baseUrl}/api/url/shorten`);

  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.send(JSON.stringify({ longUrl }));

  xhr.onreadystatechange = function() {
    if (this.status == 201 && this.readyState === 4) {
      let { shortUrl } = JSON.parse(this.response);

      let shortLinks = document.getElementById('shortLinks');
      let aTag = document.createElement('a');
      let divTag = document.createElement('div');

      divTag.classList.add('shortLinks__link');
      aTag.setAttribute('href', shortUrl);
      aTag.innerHTML = shortUrl;
      divTag.appendChild(aTag);
      shortLinks.appendChild(divTag);
    }
  };
}

const shorten = document.getElementById('shorten');

shorten.addEventListener('click', getShort);
