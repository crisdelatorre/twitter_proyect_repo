
window.addEventListener('load', () => {
    menuRender();
    initFormEvents();
    renderTweets();
    resetTL();
    initModalEvents();
});

/**
 * PINTADO DE DATOSs
 */

let menuRender = () => {

    let menuTagsArray = [];

    twitterData.asideMenu.forEach(menuItem => {
        menuTagsArray.push(menuItem);

        let menuTag = `
                <li class="main_menu_item">
                    <a href="">
                        <span class="fa ${menuItem.icon}"></span>
                        ${menuItem.tag}
                    </a>
                </li>
            `;

        document.querySelector('.main_menu').innerHTML += menuTag;
    });
};




/**
 * Variables
 */
const tweets = [{
    accountName: 'gatitos gorditos',
    userName: '@GorditosGatitos',
    pic: "https://pbs.twimg.com/media/ETvUERZWoAQeJOB.jpg",
    text: 'el toque del michichef',
    likes: 0,
    creationDate: new Date()
}];

/**
 * Iniciar eventos del formulario
 */
const initFormEvents = () => {

    const form = document.forms.form_create;
    const textArea = form.elements.tweet;

    form.addEventListener('submit', (ev) => {

        ev.preventDefault();

        if (textArea.value != "") {
            tweets.unshift({
                accountName: 'gatitos gorditos',
                userName: '@GorditosGatitos',
                pic: "https://pbs.twimg.com/media/ETvUERZWoAQeJOB.jpg",
                text: textArea.value,
                likes: 0,
                creationDate: new Date()
            });
        }

        form.reset();
        renderTweets();
    });

};

const renderTweets = () => {
    const tweetCollection = document.querySelector(".tweet_collection");
    let HTMLString = "";

    tweets.forEach(tweet => {
        HTMLString += `
        <div class="tweet_component">
                    <div class="user_pic">
                        <img src="${tweet.pic}" alt="user's profile pic">
                    </div>
                    <div class="tweet_content">
                        <div class="tweet_top">
                            <div class="account_name">${tweet.accountName}</div>
                            <div class="user_name">${tweet.userName} ·</div>
                            <div class="time_posted">2h</div>
                            <div class="delete">
                                <a href="#">
                                    <span class="fa fa-trash"></span>
                                </a>
                            </div>
                        </div>
                        <div class="tweet_info">
                            ${tweet.text}
                        </div>
                        <div class="tweet_reactions">
                            <div class="comments">
                                <span class="fa fa-comment"></span>
                                0
                            </div>
                            <div class="retweets">
                                <span class="fa fa-retweet"></span>
                                0
                            </div>
                            <div class="likes">
                                <span class="fa fa-heart"></span>
                                ${tweet.likes}
                            </div>
                        </div>
                    </div>
                </div>
        `;
    });

    tweetCollection.innerHTML = HTMLString;
    initTweetEvents();
    tweetsAmount();
}

const tweetsAmount = () => {
    const amount = tweets.length;
    const amountDom = document.querySelector(".trends .amount");
    const HTMLString = `hay ${amount} tweets`;

    amountDom.innerHTML = HTMLString;
}

const resetTL = () => {
    const amountDom = document.querySelector(".trends .reset");
    amountDom.addEventListener('click', () => {
        tweets.splice(0);
        renderTweets();
    });
};


const initTweetEvents = () => {
    const tweetsDom = document.querySelectorAll(".tweet_collection .tweet_component");


    tweetsDom.forEach((tweetsDom, i) => {

        /**
         * erase tweets
         */
        const erase = tweetsDom.querySelector(".delete");
        erase.addEventListener('click', () => {
            tweets.splice(i, 1);
            renderTweets();
        });

        const like = tweetsDom.querySelector(".likes");
        like.addEventListener('click', () => {

            tweets[i].likes++;
            renderTweets();
        });

    });

};

const initModalForm = () => {

    const form = document.forms.modal_create;
    const textArea = form.elements.tweet;
    const modalTweet = document.querySelector(".modal_tweet");


    form.addEventListener('submit', (ev) => {

        ev.preventDefault();

        if (textArea.value != "") {
            tweets.unshift({
                accountName: 'gatitos gorditos',
                userName: '@GorditosGatitos',
                pic: "https://pbs.twimg.com/media/ETvUERZWoAQeJOB.jpg",
                text: textArea.value,
                likes: 0,
                creationDate: new Date()
            });
        }

        form.reset();
        modalTweet.classList.remove('opened');
        renderTweets();

    });
};

const modalOppened = (modalTweet) => {
    modalTweet.classList.add('opened');
    document.body.style.overflow = 'hidden';
};

const initModalEvents = () => {
    const modalActuator = document.querySelector(".create_button");
    const modalTweet = document.querySelector(".modal_tweet");
    const closeModal = document.querySelector(".close_icon");
    const overlay = document.querySelector(".modal_overlay");


    modalActuator.addEventListener('click', (ev) => {
        ev.preventDefault();
        modalTweet.classList.add('opened');
    });

    closeModal.addEventListener('click', (ev) => {
        ev.preventDefault();
        modalTweet.classList.remove('opened');
    });

    overlay.addEventListener('click', (ev) => {
        ev.preventDefault();
        modalTweet.classList.remove('opened');
    });

    initModalForm();
};