import React from "react";
import { Button, Table, Select, Divider, Card } from "antd";
import "../../src/Drupal.css";
const Drupal = (props) => {
  const { Option } = Select;
  return (
    <Card>
      <div style={{ marginBottom: "20px" }}>
        <div>All Templates</div>
        <Select
          style={{ width: "30%" }}
          placeholder="Select items"
          onChange={props.onSelectTemplate}
          value={props.selectedTemplate}
          size="large"
        >
          {props.allTemplates.map((key, ind) => {
            return (
              <Option key={"template" + ind} value={key?.name}>
                {key?.name}
              </Option>
            );
          })}
        </Select>
      </div>

      <div
        style={{
          display: "flex",
          columnGap: "100px",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        <label>InDesign Property</label>
        <label>Map To</label>
      </div>
      <Divider />
      {Object.entries(props.inDesignProp?.textFrames || {})?.map(
        ([key, val], ind) => (
          <>
            <div
              key={ind + "indesinge"}
              style={{ display: "flex", columnGap: "100px" }}
            >
              <div>{`Argument ${ind + 1}`}</div>
              <Select
                style={{ width: "30%" }}
                placeholder="Select items"
                value={props.inDesignProp?.textFrames?.[key]?.equalTo}
                onChange={(val) => {
                  let copyArr = { ...props.inDesignProp };
                  copyArr.textFrames[key].equalTo = val;
                  props.setInDesignProp(copyArr);
                  props.setHasSelected(false);
                }}
              >
                {Object.keys(props.drupalProp?.[0] || []).map((key, ind) => {
                  return (
                    <Option key={"prop" + ind} value={key}>
                      {key}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <Divider />
          </>
        )
      )}
      {/* <Button onClick={handleUpdate}>Update</Button> */}
      <Button disabled={props.hasSelected} onClick={() => props.generatePdfs()}>
        Generate Pdfs{" "}
      </Button>
    </Card>
  );
};

export default Drupal;
