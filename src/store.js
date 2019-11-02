import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSearchBoxMobile: false,
    showSearchBoxPages: true,
    showSearchResult: false,
    showLoading: false,
    hotels: [],
    searchForm: {},
    searchResult: {},

    visitors: '',

    days: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    months: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يوينو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
  },

  mutations: {
    setVisitors(state, count) {
      state.visitors = count
    }
  },

  actions: {
    hideSearchDownScreens({state}) {
      if (window.matchMedia("(max-width: 767.98px)").matches) {
        state.showSearchBoxPages = false
      } else {
        state.showSearchBoxPages = true
      }
    },
    showSearchBoxAction({state}) {
      if (window.matchMedia("(min-width: 768px)").matches) {
        if (router.currentRoute.name != 'home') {
          router.push({name: 'home'})
        }
        setTimeout(() => {
          $('html, body').animate({
            scrollTop: $('.box-search').offset().top - 100
          })
        }, 100)
      } else {
        state.showSearchBoxMobile = true
        setTimeout(() => document.querySelector('.overlay-search-mobile').classList.add('show-search'))
      }
    },

    hideSearchBoxAction({state}) {
        document.querySelector('.overlay-search-mobile').classList.remove('show-search')
        setTimeout(() => {
          state.showSearchBoxMobile = true
        }, 250);
    },

    updateSearchForm({state}, form) {
      state.searchForm = {...form}
    },

    resetSearchForm({state}) {
      state.searchForm = {}
    },

    updateSearchResult({state}, result) {
      state.searchResult = {...result}
    },

    resetSearchResult({state}) {
      state.searchResult = {}
    },

    updateSearchQuery({state}) {
      // reset query
      if (Object.keys(router.currentRoute.query).length) {
        router.replace({
          ...router.currentRoute,
          query: {},
          params: {
            search: false
          }
        })
      }
      setTimeout(() => {
        // replace query
        router.replace({
          name: 'home',
          params: {
            search: true
          },
          query: {
            search: state.searchForm.search,
            category: state.searchForm.category,
            hotel_address: state.searchForm.hotel_address,
            go_and_back: state.searchForm.go_and_back,
            date_from: state.searchForm.date_from,
            date_to: state.searchForm.date_to,
            filter_price: state.searchForm.filter_price,
            filter_stars: state.searchForm.filter_stars,
            filter_hotel: state.searchForm.filter_hotel,
            sortBy: state.searchForm.sortBy,
            page: state.searchForm.page,
          }
        })
      }, 100);
    },

    getSearchFromDB({dispatch}, form) {
      return new Promise((resolve, reject) => {
        axios.get('/search', {params: form}).then(response => {
          const data = response.data
          if (typeof data === 'object') {
            // console.log(data.data)
            dispatch('updateSearchResult', data.data)
            resolve()
          }
        }).catch(error => {
          console.error('search error => ', error)
        })
      })
    },

    getSearchData(context, [vm, form]) {
      context.state.showLoading = true

        // show result box
      return context.dispatch('getSearchFromDB', form).then(() => {
        context.state.showSearchResult = true
        context.state.showLoading = false

        context.dispatch('updateSearchQuery')

        vm.$nextTick(() => {
          // got to result box
          setTimeout(() => {
            $('html, body').animate({
              scrollTop: $('#search-content').offset().top - 20
            })
            if (window.matchMedia("(max-width: 767.98px)").matches) {
              context.state.showSearchBoxMobile = false
            }
          }, 100)

          // update form
          context.dispatch('updateSearchForm', form)
        })
      }).catch(() => {
        console.error('search error')
      })
    },


    resetAndHideSearch({state, dispatch}) {
      if (Object.keys(router.currentRoute.query).length) {
        router.replace({
          ...router.currentRoute,
          query: {}
        })
      }
      state.showSearchResult = false
      dispatch('resetSearchForm')
      dispatch('resetSearchResult')

      if (window.matchMedia("(max-width: 767.98px)").matches) {
        state.showSearchBoxMobile = false
      }
    }

  }
})
