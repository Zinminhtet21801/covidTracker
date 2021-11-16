import React from "react";
import { Card, Col, Row, Statistic, Typography } from "antd";
import {
  useGetCountryNamesQuery,
  useGetCovidGlobalApiQuery,
} from "../../services/covidData";
import moment from "moment";
import Loader from "../Loader/Loader";
import CountUp from "react-countup";

const { Title, Text } = Typography;
const colPostion = {
  display: "flex",
  justifyContent: "center",
  padding: "16px",
};

function formatDate(string) {
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  };
  return new Date(string).toLocaleDateString([], options);
}

function Cards({ countryName }) {
  const splittedCountryName = countryName && countryName.split(",");
  const { data: globalData } = useGetCovidGlobalApiQuery(
    countryName
      ? { countryName: splittedCountryName[1], iso: splittedCountryName[0] }
      : ""
  );
  const todayDate = formatDate(new Date());
  if (!globalData) return <Loader />;
  return (
    <Row className="image_row">
      <Col xs={24} sm={12} lg={8} style={colPostion}>
        <Card
          hoverable
          bordered={false}
          className="infected"
          style={{ borderBottom: "10px solid rgba(0, 0, 255, 0.5)" }}
        >
          <Text type="secondary">Infected</Text>
          <br /> <br />
          <Title level={3}>
          <CountUp
            start={0}
            end={parseInt(globalData[0].TotalCases)}
            separator=","
            duration={3}
          />
          </Title>
          <Text type="secondary">{todayDate}</Text>
          <p>Number of active cases of COVID-19</p>
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={8} style={colPostion} className="col_col">
        <Card
          hoverable
          bordered={false}
          className="recovered"
          style={{ borderBottom: "10px solid rgba(0, 255, 0, 0.5)" }}
        >

        <Text type="secondary">Recovered</Text>
          <br /> <br />
          <Title level={3}>
          <CountUp
            start={0}
            end={parseInt(globalData[0].TotalRecovered)}
            separator=","
            duration={3}
          />
          </Title>
          <Text type="secondary">{todayDate}</Text>
          <p>Number of recoveries from COVID-19</p>
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={8} style={colPostion}>
        <Card
          hoverable
          bordered={false}
          className="deaths"
          style={{ borderBottom: "10px solid rgba(255, 0, 0, 0.5)" }}
        >
          <Text type="secondary">Deaths</Text>
          <br /> <br />
          <Title level={3}>
          <CountUp
            start={0}
            end={parseInt(globalData[0].TotalDeaths)}
            separator=","
            duration={3}
          />
          </Title>
          <Text type="secondary">{todayDate}</Text>
          <p>Number of deaths caused by COVID-19</p>
        </Card>
      </Col>
    </Row>
  );
}

export default Cards;
