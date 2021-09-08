export const templateLinks = (window) => {
  const ul = window.document.querySelector('.custom-links-template ul')
  if (ul !== null) ul.classList.add('row', 'mx-0')
  window.document.querySelectorAll('.custom-links-template ul li').forEach(block => {
    const itemLink = block.textContent.split('|')
    block.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'col-xl-4', 'mb-4')
    block.innerHTML = `
      <div class="shadow px-3 links-item-wrapper">
        <div class="links-item-wrapper-header">
          <img src="${itemLink[2]}" class="border links-item-wrapper-header-avatar" alt="${itemLink[0]}"/>
        </div>
        <div class="links-item-wrapper-content">
          <div class="links-item-wrapper-content-name">
            <a target="_blank" href="${itemLink[1]}">${itemLink[0]}</a>
          </div>
          <div class="links-item-wrapper-content-desc">${itemLink[3]}</div>
        </div>
      </div>
      `
  })
}

export default templateLinks(window)
