<script>
    import {auth} from '../database/firebase'
    import {isLogged} from '../store'

    const handleLogout = () => {
        auth.signOut()
        $isLogged = false
    }
</script>

<header>
    <h1>ZOC Admin <span>v.2</span></h1>
    <nav>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
            </svg>
            <p>{"Ahmad Alfan"}</p>
        </div>
        <button on:click={handleLogout}>Logout</button>
    </nav>
</header>

<style lang="scss">
    @import "../scss/_mixins.scss";
    @import "../scss/_colors.scss";
    @import "../scss/_buttons.scss";

    $nav-height: 4em;

    header {
        position: sticky;
        top: 0;
        z-index: 999;

        @include flex-row-between-center;
        padding: 0 2em;
        height: $nav-height;

        background: $white;
        border-bottom: 2px solid $light-gray;

        h1 {
            font-size: 1.5rem;
            letter-spacing: 0.02rem;

            span {
                font-size: 1rem;
            }
        }

        nav {
            @include flex-row-center;
            gap: 2em;

            div {
                @include flex-row-center;
                gap: 0.5em;
                color: $blue;

                @media (max-width: 768px) {
                    display: none;
                }

                svg {
                    height: 2rem;
                    width: 2rem;
                }

                p {
                    font-weight: bold;
                    letter-spacing: 0.02rem;
                }
            }

            button {
                @include button-danger;
            }
        }
    }
</style>