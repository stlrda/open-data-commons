import { DataCommonsConfig } from './config2'

const appConfig: DataCommonsConfig.Config = {
  globalExcludes: [
    "legacy_latest_crime_legacy_latest_get",
    "get_api_docs_crime__get",
    "latest_data_crime_latest_get",
  ],
  items: {
    "legacy_nbhood_crime_legacy_nbhood_get": {
      queries: [
        {
          format: "year", // could make array?
          // ...more options
        },
        {
          format: "month",
          default: "january"
        },
        {
          format: "category",
          default: "homicide"
        }
      ],
      responses: [
        {
          field: "neighborhood",
          format: "number",
          numericCategory: true,
        },
        {
          field: "ucr_category",
          format: "category", // ucr_category
        },
        {
          field: "incidents",
          format: "number"
        }
      ],
    },
    "crime_points_crime_coords_get": {
      queries: [
        {
          field: "start",
          format: "date",
          default: "2019-01-01" // to override
          // ...more options
        },
        {
          field: "end",
          format: "date",
        },
        {
          field: "category",
          format: "category", // ucr_category
        }
      ],
      responses: [
        {
          field: "id",
          identifier: true, // can at least count # of occurences
        },
        {
          field: "lon",
          format: "geo",
          description: "lon",
        },
        {
          field: "lat",
          format: "geo",
          description: "lat",
        }
      ]
    },
    "crime_detailed_crime_detailed_get": {
      responses: [
        {
          field: "id",
          identifier: true
        },
        {
          field: "date",
          format: "date",
        },
        {
          field: "time",
          format: "time",
        },
        {
          field: "description",
          format: "string", // not sure what all the codes are
          category: true,
          charts: [""]
        }
      ],
    },
    "crime_aggregate_crime__geometry__get": {
      queries: [
        {
          field: "geometry",
          format: "geometry_category"
        },
        {
          field: "start",
          format: "date",
        },
        {
          field: "end",
          format: "date",
        },
        {
          field: "category",
          format: "category"
        }
      ],
      responses: [
        {
          field: "region",
          format: "number",
          numericCategory: true,
        },
        {
          field: "count",
          format: "number",
        }
      ],
    },
  },
  formats: {
    string: {
      type: "string",
      default: "",
    },
    number: {
      type: "number",
      default: 0,
      // discrete: true
    },
    date: {
      type: "string",
      min: "2008-01-01",
      max: "2020-10-01",
      default: ["2020-01-01", "2020-10-01"],
      description: "YYYY-MM-DD"
    },
    year: {
      type: "number",
      min: 2008,
      max: 2020,
      default: 2020
    },
    month: {
      type: "string",
      options: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "September",
        "October",
        "November",
        "December"
      ],
      default: "January"
    },
    category: {
      type: "string",
      options: [
        "Fraud",
        "Simple Assault",
        "Loitering/Begging",
        "Arson",
        "Offense Against Family",
        "Sex Offense",
        "DWI/DUI",
        "Forgery",
        "Disorderly Conduct",
        "Embezzlement",
        "Aggravated Assault",
        "Robbery",
        "Other",
        "Stolen Property",
        "Burglary",
        "Weapons Offense",
        "Rape",
        "VMCSL",
        "Vehicle Theft",
        "Larceny",
        "Destruction of Property",
        "Liquor Laws",
        "Homicide",
      ],
      default: "Homicide"
    },
    geometry_category: {
      type: "string",
      options: [
        "district",
        "neighborhood",
      ],
      default: "district"
    },
    geo: {
      type: "number",
      // ...
    },
    time: {
      type: "string",
      description: "HH-MM-SS",
      min: "00:00:00",
      max: "24:00:00",
      default: "00:00:00",
    }
  },
}

export default appConfig
