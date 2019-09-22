<script>
    import { Link } from "svero";
    import { onMount } from 'svelte';

    import Article from '../Article.svelte';
    import { offset, feedOffset } from '../../api/stores'

    export let item;
    export let i;

    let image = new Image;
    let thumb = new Image;


    image.src = item.images.mainImage.url;
    thumb.src = item.images.mainImageThumbnail.url;
    image.title = item.title;

   
    function handleArticle(e){
        $feedOffset = e.detail.pageY;
    }

    onMount(()=>{

        image.src = item.images.mainImage.url;
        image.style.backgroundImage = 'red';
        image.title = item.title;
       
        image.addEventListener('load', function() {
            image.style.backgroundImage = '#fff';
        }, false);
        
        
    })
    
</script>

<style>
    .main_box {
        position: relative;
        width: 100vw;
        min-height: 20vh;
    }

    .main_thumb {
        width: calc(100vw - 10px);
        min-height: 20vh;
        background: #ddd;
        height: 220px;
        background-size: cover;
        background-position: top center;
        margin: 5px;
    }

    .main_title {
        background: linear-gradient(to top, black, transparent);
        position: absolute;
        bottom: 0;
        color: #fff;
        font-size: 1rem;
        padding: 15px 20px;
    }

</style>

<section >
    <div id="main_box-{i}" class="main_box main_thumb" style="background-image: url({image.src});">
        <Link href="/article/{item.contentId}" on:click={handleArticle}>
        <div class="main_title">
            {item.title}
        </div>
        </Link>
    </div> 
</section>
