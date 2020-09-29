let statePat = 'pat00';
let statePic = 'pic00';
let stateCol = 'col01'

let statePage = 0;

const urlParams = new URLSearchParams(window.location.search);
let url = location.href;



gallerySelect('.select-group');
stateColChange('.state-color');

document.querySelectorAll('.goto_constructor').forEach(el => el.addEventListener('click', goToConstructor));

document.getElementById('goto_result').addEventListener('click', goToResult);

document.querySelectorAll('.go_home').forEach(el => el.addEventListener('click', goHome));

window.addEventListener("resize", groundImgSize);
groundImgSize();

readQueryParams();

updateSocLinks();

if ( iOS() ) {
    document.querySelectorAll('.ios-only').forEach(el => {
        el.style.display = 'inline-block'
    });
    document.querySelectorAll('.not-ios').forEach(el => {
        el.style.display = 'none'
    });
}


function readQueryParams() {
    if ( urlParams.has('pat') && urlParams.has('pic') ) {
        statePat = 'pat' + urlParams.get('pat');
        statePic = 'pic' + urlParams.get('pic');
        stateCol = '';
        if ( urlParams.has('col') ) {
            stateCol = urlParams.get('col');
        };
        updateShowWip();
        goToResult();
    } else goHome();
}

function writeQueryParams() {
    url = location.href;
    url = url.split('?')[0];

    if ( statePage === 2 ) {
        let paramCol = ''
        if ( stateCol.length > 0 ) {
            paramCol = '&col=' + stateCol.slice(3);
        }
        const params = 
            '?pat=' + statePat.slice(3) + 
            '&pic=' + statePic.slice(3) + 
            paramCol;
        url += params;
    }

    // location.href = url;
    window.history.pushState({id: 100}, 'Люк, я твой', url);
}

function goHome() {
    document.querySelectorAll('.constructor').forEach(el => {
        el.classList.add('hide');
    });
    document.querySelectorAll('.result').forEach(el => {
        el.classList.add('hide');
    });
    document.querySelectorAll('.intro').forEach(el => {
        el.classList.remove('hide');
    });
    document.querySelector('body').removeAttribute('class');

    statePage = 0;
    writeQueryParams();
    updateSocLinks();

    window.scrollTo(0, 0);
}

function goToConstructor() {
    document.querySelectorAll('input[type="radio"]').forEach(element => {
        element.checked = false;
        if ( element.getAttribute('id').slice(3) === '00' ) {
            element.checked = true;
        }
    });
    statePat = 'pat00';
    statePic = 'pic00';
    updateShowWip();

    document.querySelectorAll('.intro').forEach(el => {
        el.classList.add('hide');
    });
    document.querySelectorAll('.result').forEach(el => {
        el.classList.add('hide');
    });
    document.querySelectorAll('.constructor').forEach(el => {
        el.classList.remove('hide');
    });
    document.querySelector('body').classList = [];
    document.querySelector('body').classList.add('page_constructor');

    statePage = 1;
    writeQueryParams();
    updateSocLinks();

    window.scrollTo(0, 0);
}

function goToResult() {
    document.querySelectorAll('.intro').forEach(el => {
        el.classList.add('hide');
    });
    document.querySelectorAll('.constructor').forEach(el => {
        el.classList.add('hide');
    });
    document.querySelectorAll('.result').forEach(el => {
        el.classList.remove('hide');
    });
    document.querySelector('body').classList = [];
    document.querySelector('body').classList.add('page_result');
    groundImgSize();

    document.querySelector('.result-empty').style.display = 'none';
    if ( statePat === 'pat00' && statePic === 'pic00' ) {
        document.querySelector('.result-empty').style.display = 'block';
    };

    statePage = 2;
    writeQueryParams();
    updateSocLinks();

    window.scrollTo(0, 0);
}

function gallerySelect(el) {
    document.querySelectorAll(el).forEach(element => {
        element.querySelectorAll('input').forEach(element => {
            element.addEventListener('click', () => {
                const id = element.getAttribute('id');
                const type = id.slice(0,3);
                if (type === 'pat') {
                    statePat = id;
                } else if (type === 'pic') {
                    statePic = id;
                };
                updateShowWip();
            })
        });
    });
}

function updateSocLinks() {
    document.querySelectorAll('.soc_link-facebook').forEach(el => {
        el.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) );
    });

    document.querySelectorAll('.soc_link-telegram').forEach(el => {
        el.setAttribute('href', 'https://telegram.me/share/url?url=' + encodeURIComponent(url) );
    });

    document.querySelectorAll('.soc_link-twitter').forEach(el => {
        el.setAttribute('href', 'https://twitter.com/intent/tweet?text=Крышка%20люка%20на%20твой%20вкус%0D%0A' + encodeURIComponent(url) );
    });
}

function stateColChange(el) {
    elem = document.querySelector(el)
    elem.addEventListener('change', () => {
        stateCol = '';
        if ( elem.checked ) {
            stateCol = 'col01';
        }
        updateShowWip();
    });
}

function updateShowWip() {
    document.querySelector('.show_mhc').style.backgroundImage = document.querySelector('.actual_mhc').style.backgroundImage;
    const imgPath = './assets/';
    let imgStateCol = stateCol.length > 0 ? '_' + stateCol : '';
    const imgFilename = statePat + '_' + statePic + imgStateCol;
    const imgFilenameObj = statePat + '_' + statePic;

    document.querySelector('.actual_mhc').style.backgroundImage = 'url("' + imgPath + imgFilename + '.png")';

    document.querySelectorAll('.download-png').forEach(el => {
        el.setAttribute('href', imgPath + imgFilename + '.png')
    });

    document.querySelectorAll('.download-3d').forEach(el => {
        el.setAttribute('href', imgPath + imgFilenameObj + '.obj')
    });

    document.querySelectorAll('.ar-link').forEach(el => {
        el.setAttribute('href', imgPath + imgFilename + '.usdz')
    });
}

function groundImgSize() {
    const mhcPositionY = document.querySelector('.show_mhc').offsetTop;
    const mhcPositionX = document.querySelector('.show_mhc').offsetLeft + (document.querySelector('.actual_mhc').offsetWidth / 2);
    document.querySelector('.ground_img').style.height = mhcPositionY + 'px';
    document.querySelector('.ground_img').style.left = mhcPositionX + 'px';
}

function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}