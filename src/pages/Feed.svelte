<script>

    import { onMount } from 'svelte';
    import { offset, items, feedOffset } from '../api/stores'
    import List from './components/List.svelte';
    import { Router, Route } from 'svero';

    export let router = {};
    
   
    const cat = router.params._.split('cat=')[1];
     console.log('Router: ', cat);

    
    // $: _items = $items;

    const hash = 'key=e2yFGbr8SvG0mC5D6cRAEl3QIUnW4v9g&publisherId=thestartmagazine.com&userId=pasha'; 
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'accept': 'application/json; charset=utf-8',
		'Mode':'no-cors'
    };

    const request = new Request('https://api.thestartmagazine.com/mediaApi/v1.0/content?' + hash +
        '&language=en&limit=20&locale=en_US&category=' +cat
        + '&offset='+ $offset, headers);
    
    const categoryReq = new Request('https://api.celltick.com/mediaApi/mediaApi/v1.0/category?'  + hash 
    +'&language=en&locale=en_US', headers)

     let mappedImage = [];

    async function getArticleList() {
        return fetch(request)
            .then(async (response)=> {
               

                let data = await response.json();

                mappedImage = data.content.map((items)=>{
                    return items.images.mainImage.url
                });

                $offset = $offset + 20;
                preload(mappedImage, $offset);

                return data.content;
            });
    }

     async function getCategory() {
        return fetch(categoryReq)
            .then(async (response)=> {
                let data = await response.json();
                return data;
            });
    }

     const initIntersectionObserver = () => {
        let trigger = $items.length - 2;
        const options = {
            /* root: document.querySelector(".cat-list") */
        }

        const callback = entries => {
            entries.forEach(entry => {

                if (entry.isIntersecting){
                    
                    console.debug('target items : ', entry.target);
                  

                    getArticleList().then((data)=>{
                        
                        if ($items.length){
                            let _tempArr = $items.concat(data);
                            $items = _tempArr;
                        } else {
                            $items = data;
                    }

               
                    
                    //TODO subscribe on render from list;

                    console.debug('$items.length:', $items.length);

                    });
                }
            });
        }

        var observer = new IntersectionObserver(callback, options);

        let lastItem = document.querySelector(`#main_box-${ trigger }`);
        if (lastItem) {
            observer.observe(lastItem);
        }
    }

    function preload(imageArray, index) {
        index = index || 0;
        if (imageArray && imageArray.length > index) {
            var img = new Image ();
            img.onload = function() {
                preload(imageArray, index + 1);
            }
            img.src = imageArray[index];
        }
    }


    onMount(() => {
        window.scrollTo(0, $feedOffset - window.innerHeight/2 );

        getArticleList().then((data)=>{
            if ($items.length){
                let _tempArr = $items.concat(data);
                $items = _tempArr;
            } else {
                $items = data;
            }

            setTimeout(()=>{
                initIntersectionObserver();
            }, 1000);

        });

        // getCategory().then((category)=>{
        //     console.log('categories:', category);
        // })
    });

</script>

<style>
   :global(body) {
       padding: 0;
   }

</style>


<div class="boxes_container">
    {#if $items}
        {#each $items as item, i}
            <List {item} {i} />
        {/each}
    {/if}

</div>