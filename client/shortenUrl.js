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
      console.log(shortUrl);

      let shortLinks = document.getElementById('shortLinks');
      let newChild = document.createElement('a');
      newChild.classList.add('shortLinks__link');
      newChild.setAttribute('href', shortUrl);
      newChild.innerHTML = shortUrl;
      shortLinks.appendChild(newChild);
    }
  };
}

const shorten = document.getElementById('shorten');

shorten.addEventListener('click', getShort);
