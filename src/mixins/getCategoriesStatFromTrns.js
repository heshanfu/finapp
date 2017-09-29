import uniqBy from 'lodash/uniqBy'
import orderBy from 'lodash/orderBy'

// Parent should to have: this.groupedByParent, this.categories
export default {
  methods: {
    getCategoryStat(categoryId, type) {
      const trnType = type === 'incomes' ? 1 : 0
      const category = this.categories.find(category => category.id === categoryId)
      const childCategories = this.categories.filter(category => category.parentId === categoryId)
      let trns = []

      // Parent category
      // Trns only inside child categories
      if (category.parentId === 0) {
        trns = this.trnsList.filter(trn => {
          return childCategories.filter(category => category.id === trn.categoryId).length
        })
      }

      // Children category
      // Trns only in this category
      if (category.parentId !== 0) {
        trns = this.trnsList.filter(trn => trn.categoryId === categoryId)
      }

      // Create array of objects with data in categories
      const data = []
      childCategories.map((category) => {
        const trnsInCategory = trns.filter(trn => trn.categoryId === category.id && trn.type === trnType)
        const total = trnsInCategory.reduce((sum, current) => sum + current.amountRub, 0)
        const trnsCategory = this.categories.find(c => c.id === category.id)
        if (total > 0) {
          data.push({
            id: category.id,
            category: trnsCategory,
            name: trnsCategory.name,
            total,
            icon: trnsCategory.icon,
            color: trnsCategory.color,
            trns: trnsInCategory
          })
        }
      })
      return orderBy(data, d => d.total, 'desc')
    },

    getCategoriesStatFromTrns(trns) {
      if (trns && trns.length > 0) {
        // Grouped by parent category

        if (true) {
          // просто через перебор сделать
          const catsIds = uniqBy(trns, 'categoryRoot.id').map(trn => trn.categoryRoot.id)

          // Create array of objects with data in categories
          const data = catsIds.map((id) => {
            const trnsInCategory = trns.filter(trn => trn.categoryRoot.id === id)
            const total = trnsInCategory.reduce((sum, current) => sum + current.amountRub, 0)
            const category = this.categories.find(c => c.id === id)
            return {
              id,
              category: category,
              name: category.name,
              total,
              icon: category.icon,
              color: category.color,
              trns: trnsInCategory
            }
          })
          return orderBy(data, d => d.total, 'desc')
        }

        // Grouped by child category
        // if (!this.groupedByParent) {
        //   // Create array of categories ids
        //   const catsIds = uniqBy(trns, 'categoryId').map(trn => trn.categoryId)

        //   // Create array of objects with data in categories
        //   const data = catsIds.map((id) => {
        //     const trnsInCategory = trns.filter(trn => trn.categoryId === id)
        //     const total = trnsInCategory.reduce((sum, current) => sum + current.amountRub, 0)
        //     const category = this.categories.find(c => c.id === id)
        //     return {
        //       id,
        //       category: category,
        //       name: category.name,
        //       total,
        //       icon: category.icon,
        //       color: category.color,
        //       trns: trnsInCategory
        //     }
        //   })
        //   return orderBy(data, d => d.total, 'desc')
        // }
      }
      return []
    }
  }
}