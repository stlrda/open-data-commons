/* eslint-disable no-unused-vars */
// API Items for a single collection of endpoints
import { nanoid } from 'nanoid'
import ApiItem, { PrimitiveTypeEnum, ComplexTypeEnum } from '../types/ApiItem'

const idFactor = 10;

const apiItems: ApiItem[] = [
  {
    id: nanoid(idFactor),
    title: "Legacy Latest",
    endpoint: {
      http: 'GET',
      path: "/crime/legacy/latest",
      website: "https://api.stldata.org/crime/legacy/latest",
    },
    parameters: [], // hasParams: false
    responses: [
      {
        code: 200,
        message: "Successful Response",
        schema: [
          {
            name: "crime_last_update",
            type: "string",
            subtype: "date", // i.e. string <date>
            required: true
          },
        ]
      }
    ]
  },
  {
    id: nanoid(idFactor),
    title: "Legacy Nbhood",
    endpoint: {
      http: 'GET',
      path: "/crime/legacy/nbhood",
      website: "https://api.stldata.org/crime/legacy/nbhood",
    },
    parameters: [
      {
        name: "year",
        type: "integer",
        required: true,
      },
      {
        name: "month",
        type: "string",
        required: true,
      },
      {
        name: "gun",
        type: "string",
        defaultValue: false
      }
    ],
    responses: [
      {
        code: 200,
        message: "Successful Response",
        // type: "application/json",
        complex: true, // true if complex (array or object), undefined/false if primitive
        complexType: ComplexTypeEnum.ARRAY, // Enum: Array or Object
        schema: [
          {
            name: "neighborhood",
            type: "string",
            required: true
          },
          {
            name: "ucr_category",
            type: "string",
            required: true
          },
          {
            name: "Incidents",
            type: "integer",
          }
        ]
      },
      {
        code: 422,
        message: "Validation Error",
        schema: [],
        // type: "application/json",
        // error: true, // Should I have this field??
        placeholderText: "detail",
        placeholderDescription: "Array of objects"
      }
    ]
    // responseSamples: [
    //   {
    //     code: 200,
    //     contentType: "application/json",
    //     content: [
    //       "{",
    //       "\tcrime_last_update: 2019-08-24", // IDK: would need to write a parser for this too
    //       "}",
    //     ]
    //   },
    //   // ...
    // ]
  },
  {
    id: nanoid(idFactor),
    title: "Legacy District",
    endpoint: {
      http: 'GET',
      path: "/crime/legacy/district",
      website: "https://api.stldata.org/crime/legacy/district",
    },
    parameters: [
      {
        name: "year",
        type: "integer",
        required: true,
      },
      {
        name: "month",
        type: "string",
        required: true,
      },
      {
        name: "gun",
        type: "string",
        defaultValue: false
      }
    ],
    responses: [
      {
        code: 200,
        message: "Successful Response",
        complex: true,
        complexType: ComplexTypeEnum.ARRAY, // Enum: Array or Object
        schema: [
          {
            name: "district",
            type: "string",
            required: true
          },
          {
            name: "ucr_category",
            type: "string",
            required: true
          },
          {
            name: "Incidents",
            type: "integer",
          }
        ]
      },
      {
        code: 422,
        message: "Validation Error",
        schema: [],
        placeholderText: "detail",
        placeholderDescription: "Array of objects"
      }
    ]
  },
]

export default apiItems;
