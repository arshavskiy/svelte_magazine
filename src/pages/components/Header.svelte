<script>

    import {Link} from "svero";

</script>

<style>
    header {
        position: fixed;
        top: 0;
        z-index: 2;
        background: linear-gradient(to bottom, black -20%, transparent 105%);
        width:100%;
        padding: 0.6rem .5rem 0 .5rem;
    }

    .logo{
        height: 2rem;
        width: 2rem;
        display: block;
        background-size: contain;
        background-repeat: no-repeat;
    }

</style>

<header>
    <Link href="/feed">
        <span class="logo" style="background-image: url('https://www.thestartmagazine.com/assets/feed/feed_menu.png');"></span>
    </Link>
    <!-- <Link href="/about" class="logo">About</Link> -->
    
</header>