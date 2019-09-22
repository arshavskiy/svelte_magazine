<script>
    import { onMount } from 'svelte';
    // import { tweetId } from '../api/stores';

    let article;
    let contentId = window.location.pathname.split('/')[2];

     let mainImage;
     let href;
     let additionalImages = [];

    const request = new Request('https://api.thestartmagazine.com/mediaApi/v1.0/content/'+contentId+'?key=e2yFGbr8SvG0mC5D6cRAEl3QIUnW4v9g&publisherId=thestartmagazine.com'+
    '&userId=12345678918&language=ru&limit=20&locale=en_US', {
        'Content-Type': 'application/json; charset=utf-8',
        'accept': 'application/json; charset=utf-8',
		'Mode':'no-cors'
    });


   
    function articleTexed(){
        let splittedArtilce;
        let prittyText = article.text.replace(/"/g, "'");

        let testRegex = /ct-tweet data-status="([^\\"]|\\")*"/gi;

        console.log('tweet: ', testRegex.test(article.text) );

        let tweets = article.text.match(testRegex);

        if (tweets){
            let sweetIds = [];
            let tweetHTML = [];

            tweets.map((t, i)=>{
                sweetIds[i] = t.match(/[0-9]+/g)[0];
                // tweetId.set( sweetIds[i] );
                getTweets(sweetIds[i]);
            })
        }
      
        if (additionalImages.length){
            let tweetText;
            // tweetText = prittyText.parseURL().parseUsername().parseHashtag();

            splittedArtilce = prittyText.split('<p>');
            splittedArtilce[ Math.round(splittedArtilce.length/3) ] += '<div class="article_image"><img src="' +additionalImages[0].url + '"></div>'

            console.table('additionalImages:', additionalImages);

            return splittedArtilce.join();
        }
        return  article.text;
    }


    function getTweets(tweetId){

        const tweetRequest = new Request('https://api.twitter.com/1/statuses/oembed.json?id=' + tweetId + '&align=center&callback=?', {
            'Content-Type': 'application/json; charset=utf-8',
            'accept': 'application/json; charset=utf-8',
		    'mode':'no-cors'
        });

        
        return fetch(tweetRequest)
            .then((data) => {
                console.log('tweetRequest: ', data);
                return data;
            })
        
    };
        
    onMount(async () => {
        return await fetch(request)
            .then(r => r.json())
            .then((data) => {
            
                article = data.content[0];
                mainImage = article.images.mainImage.url;
                href = article.origURL;
                if (article.images.additionalImages.length){
                    additionalImages = article.images.additionalImages;
                }
                
            });
    });

</script>

<style>

    .article_container{
        background: linear-gradient(to bottom, black 50%, transparent 85%);
    }

    .article_main_image_container{
        height: 40vh;
        width: 100%;
    }

   .article_text_container {
        position: relative;
        top:-2rem;
        padding: 10px 15px;
        margin: -8px 10px 0 10px;
        background: #fff;
        z-index: 1;
   }

   .article_header {
       margin-top: .4rem;
   }

    :global(.article_container .article_image img) {
        width: calc(100vw - 50px);
    }

</style>

{#if article}
<main  class="article_container">

    <div class="article_main_image_container" style="background: url('{mainImage}') top center/cover;">
       <!-- <img class="article_main_image"  src={mainImage} alt={article.title}>  -->
    </div>

    <div class="article_text_container">
        <h3 class="article_header">
            {article.title}
        </h3>
        <p id="article_text">
            {@html articleTexed()}
        </p>

        {#if article.isPreview}
            <div class="artilce_read_more">
                <a {href} target="_blank">Read more... </a>
            </div>
        {/if}
    </div>

    

</main>

{/if}



