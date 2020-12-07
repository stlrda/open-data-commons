import { ODCNavRoute } from '../../types/Openapi'

const sidebarRoutes: ODCNavRoute[] = [
  {
    http:  "get",
    summary:  "Legacy Latest",
    operationId:  "legacy_latest_crime_legacy_latest_get"
  },
  {
    http:  "get",
    summary:  "Legacy Nbhood",
    operationId:  "legacy_nbhood_crime_legacy_nbhood_get"
  },
  {
    http:  "get",
    summary:  "Legacy District",
    operationId:  "legacy_district_crime_legacy_district_get"
  },
  {
    http:  "get",
    summary:  "Legacy Range",
    operationId:  "legacy_range_crime_legacy_range_get"
  },
  {
    http:  "get",
    summary:  "Legacy Trends",
    operationId:  "legacy_trends_crime_legacy_trends_get"
  },
  {
    http:  "get",
    summary:  "Get Api Docs",
    operationId:  "get_api_docs_crime__get"
  },
  {
    http:  "get",
    summary:  "Latest Data",
    operationId:  "latest_data_crime_latest_get"
  },
  {
    http:  "get",
    summary:  "Crime Points",
    operationId:  "crime_points_crime_coords_get"
  },
  {
    http:  "get",
    summary:  "Crime Detailed",
    operationId:  "crime_detailed_crime_detailed_get"
  },
  {
    http:  "get",
    summary:  "Crime Aggregate",
    operationId:  "crime_aggregate_crime__geometry__get"
  }
]

export default sidebarRoutes
