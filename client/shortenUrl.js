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
      let copyButton = document.createElement('button');
      copyButton.classList.add(
        'url-shortener__submit',
        'block',
        'bg-teal-500',
        'hover:bg-teal-700',
        'text-white',
        'font-bold',
        'mt-2',
        'py-2',
        'px-4',
        'rounded-full'
      );
      copyButton.innerHTML = 'Copy';

      copyButton.addEventListener('click', copyLink);
      divTag.appendChild(copyButton);
      shortLinks.appendChild(divTag);
    }
  };
}

const copyLink = e => {
  let shortLink = e.target.previousSibling.innerHTML;

  let textArea = document.createElement('textarea');
  document.body.appendChild(textArea);
  textArea.value = shortLink;
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
};

const shorten = document.getElementById('shorten');

shorten.addEventListener('click', getShort);
