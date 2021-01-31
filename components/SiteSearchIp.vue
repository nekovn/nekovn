<template>
  <div class="site-sm">
    <form action="" method="get">
      <div class="header-search-ip">
        <svg
          stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em"
          width="1em" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;">
          <path
            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">
          </path>
        </svg>
        <input
          class="header-search__input-ip"
          v-on:keyup="keyUp"
          v-on:blur="search"
          v-model="query"
          type="text"
          placeholder="Tìm kiếm ..."
          aria-label="Search" name="query">
        <ul v-if="matches" class="search-results-ip subtle-box-shadow-ip">
          <div v-if="matches.length">
            <li
              v-for="match in matches"
              :key="match.slug"
              @click="toggleSearchBar()"
            >
              <nuxt-link :to="`/${match.slug}`">
                {{ match.title.rendered }}
              </nuxt-link>
              <small class="match-snippet" v-html="match.snippet"></small>
            </li>
          </div>

          <li v-else>
            見つかりませんでした。
            <font-awesome-icon
              icon="times"
              @click="toggleSearchBar()"
            ></font-awesome-icon>
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import {getLoadIcon} from '@/helpers/notication';
import HamburgerButton from '~/components/HamburgerButton'
import {mapActions} from "vuex";

export default {
  name: "site-search-ip",
  components: {HamburgerButton},

  data() {
    return {
      active: false,
      transitioning: false,
      matches: false,
      haystack: [],
      query: '',
      lastQuery: ''
    }
  },
  methods: {
    ...mapActions({
      setLoading: 'setLoading',
    }),
    toggleSearchBar() {
      this.active = !this.active
      this.matches = false
      this.query = ''
      this.lastQuery = ''
    },
    keyUp() {
      if (this.query === '') {
        this.matches = false
        return
      }
    },
    async search(e) {
      this.query = e.target.value;
      this.lastQuery = this.query
      if (this.query === '') {
        this.matches = false
        return
      }
      getLoadIcon(this, 1000);
      //neu haystack co valu thi goi haystack con ko co thi goi api
      const posts = this.haystack.length
        ? this.haystack
        : await this.$api.$get('/posts')
      const matches = posts.filter((match) => {
        return (
          match.content.rendered
            .toLowerCase()
            .replace(/#|_|-|~|>|\*|!|\+|`|\||\[|\]|_|:/g, '')
            .indexOf(this.query.toLowerCase()) > -1
        )
      })

      this.matches = matches.map((match) => {
        match.snippet = this.getMatchSnippet(this.query, match.content.rendered)
        return match
      })
    },
    getMatchSnippet(query, haystack) {
      const cleanQuery = query.toLowerCase()
      const words = haystack
        .toLowerCase()
        .replace(/#|_|-|~|>|\*|!|\+|`|\||\[|\]|_|:/g, '')
      const pos = words.indexOf(cleanQuery)
      const start = pos > 10 ? pos - 10 : 0
      const end = words.length > pos + 10 ? pos + 10 : words.length
      const prepend = pos > 25 ? '...' : ''
      const append = words.length > pos + 10 ? '...' : ''
      return (
        prepend +
        words
          .slice(start, end)
          .replace(/^. /, '')
          .replace(/ .$/, '')
          .replace(cleanQuery, `<span>${cleanQuery}</span>`)
          .trim() +
        append
      )
    }
  }
}
</script>

<style scoped>
.site-sm {
  display: none;
}

.header-search-ip {
  display: none;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  top: 2rem;
  left: 50%;
  z-index: 99;
  background-color: #edf2f7;
  transform: translate(0px, 0px);
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.5rem;
  border: 3px solid transparent;
}

.header-search__input-ip {
  display: block;
  width: 150%;
  -webkit-appearance: none;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  background-color: transparent;
  margin: 0px 0px 0px 0.25rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 0;
  outline: none;
}

.header-search-ip {
  display: none;
}

@media screen and (max-width: 575px) {
  .header-search-ip {
    margin-top: 13px;
    width  : 200px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }

  .search-results-ip {
    background: white;
    padding: 10px;
    position: absolute;
    top: 110%;
    left: 0;
    width: 200px;
    font-size: 14px;
  }

  .subtle-box-shadow-ip {
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  }

  .site-sm {
    display: block;

  }
}
@media all and (device-width: 360px) and (device-height: 740px) and (orientation:portrait) {
  .header-search-ip {
    margin-top: 13px;
    width  : 185px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }

  .search-results-ip {
    background: white;
    padding: 10px;
    position: absolute;
    top: 110%;
    left: 0;
    width: 185px;
    font-size: 14px;
  }

  .subtle-box-shadow-ip {
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  }

  .site-sm {
    display: block;

  }
}
@media all and (device-width: 740px) and (device-height: 360px) and (orientation:portrait) {
  .header-search-ip {
    margin-top: 13px;
    width  : 400px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }

  .search-results-ip {
    background: white;
    padding: 10px;
    position: absolute;
    top: 110%;
    left: 0;
    width: 400px;
    font-size: 14px;
  }

  .subtle-box-shadow-ip {
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  }

  .site-sm {
    display: block;

  }
}
@media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait) {
  .header-search-ip {
    margin-top: 13px;
    width  : 400px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }

  .search-results-ip {
    background: white;
    padding: 10px;
    position: absolute;
    top: 110%;
    left: 0;
    width: 400px;
    font-size: 14px;
  }

  .subtle-box-shadow-ip {
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  }

  .site-sm {
    display: block;

  }
}
@media all and (device-width: 1024px) and (device-height: 768px) and (orientation:landscape) {
  .site-sm {
    display: none;
  }
  .header-search-ip {
    display: none;
  }
}

</style>
