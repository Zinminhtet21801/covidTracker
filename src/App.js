import "./App.css";
import Cards from "./components/Cards/Cards";
import "antd/dist/antd.css";
import covidImage from "./images/covid.png";
import { useGetCountryNamesQuery } from "./services/covidData";
import { Select } from "antd";
import { useState } from "react";
import Loader from "./components/Loader/Loader";
import Chart from "./components/Chart/Chart";

const { Option } = Select;

function App() {
  const { data: countryNames, isFetching } = useGetCountryNamesQuery();
  const [selectedCountry, setSelectedCountry] = useState();
  if (!countryNames) return <Loader />
  return (
    <div style={{ backgroundColor: "#ececec", minHeight : "100vh" }}>
      <div className="container">
        <img className="covid_image" src={covidImage} alt="" />
        <Cards countryName={selectedCountry} />
        <Select
          style={{ width: 280, borderBottom : "1px solid black", fontWeight : "bold" }}
          showSearch
          defaultValue=""
          bordered={false}
          placeholder="Global"
          onChange={setSelectedCountry}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="">Global</Option>
          {countryNames.map((country, index) => (
            <Option value={`${country.ThreeLetterSymbol},${country.Country}`} key={index}>{country.Country}</Option>
          ))}
        </Select>
        { selectedCountry && <Chart selectedCountry={selectedCountry} />}
      </div>
    </div>
  );
}

export default App;
