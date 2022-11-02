const Product = require("../models/product")

const getAllProductsStatic = async (req, res) => {
    const search = "albany"
    const products = await Product.find({
        name: { $regex: search, $options: "i" },
    })
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query //This way we get just the attributes users can search to avoid bad searches
    //Attributes that are not on our model (and on the line above ^^) won't be queryed
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === "true" ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" } //search for complete names with just a slice (e.g. search "a" and finds alex)
    }
    if (numericFilters) {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        }
        const regEx = /\b(<|>|>=|<=|=)\b/g
        let filters = numericFilters.replace(
            //get the symbol of the regEx that matches
            regEx,
            (match) => `-${operatorMap[match]}-` //get that match (the symbol) and searches it in operatorMap to get the $ transform
        )
        const options = ["price", "rating"] //The 2 properties that can use Numeric Filters
        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-")
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
                //We update the queryObject FOR EACH 3 items (field, operator, value) separated by comas.
            }
        })
    }
    let result = Product.find(queryObject)
    if (sort) {
        const sortList = sort.split(",").join(" ")
        result = result.sort(sortList)
    } else {
        result = result.sort("createdAt")
    }
    if (fields) {
        const fieldsList = fields.split(",").join(" ")
        result = result.select(fieldsList) //Shows just the fields we want to see (we pass it)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProducts, getAllProductsStatic }
