import { DataCommonsConfig } from '../../../mocks/config2'

const configData: DataCommonsConfig.ApiItemConfig = {
  queries: [
    {
      field: "start",
      format: "date"
    },
    {
      field: "end",
      format: "date",
      default: "2020-10-01"
    },
    {
      field: "category",
      format: "category"
    }
  ],
  responses: [
    {
      field: "id",
      identifier:  true
    },
    {
      field: "date",
      format: "date"
    },
    {
      field: "time",
      format: "time"
    },
    {
      field: "description",
      format: "string",
      category:  true,
      charts:  [
        ""
      ]
    },
    {
      field: "lon",
      format: "geo",
      description:  "lon"
    },
    {
      field: "lat",
      format: "geo",
      description:  "lat"
    }
  ]
}

export default configData;
