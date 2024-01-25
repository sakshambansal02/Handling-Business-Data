import assert from "assert";
import { Business } from "../include/data.js";
import { FluentBusinesses } from "./FluentBusinesses";

const testData: Business[] = [
  {
    business_id: "abcd",
    name: "Applebee's",
    city: "Charlotte",
    state: "NC",
    stars: 4,
    review_count: 6,
  },
  {
    business_id: "abcd",
    name: "China Garden",
    state: "NC",
    city: "Charlotte",
    stars: 4,
    review_count: 10,
  },
  {
    business_id: "abcd",
    name: "Beach Ventures Roofing",
    state: "AZ",
    city: "Phoenix",
    stars: 3,
    review_count: 30,
  },
  {
    business_id: "abcd",
    name: "Alpaul Automobile Wash",
    city: "Charlotte",
    state: "NC",
    stars: 3,
    review_count: 30,
  },
];

describe("bestPlace", () => {
  it("filters correctly", () => {
    const list = new FluentBusinesses(testData).fromCityInState("Charlotte", "NC").getData();

    assert(list.length === 3);
    assert(list[0].name === "Applebee's");
    assert(list[1].name === "China Garden");
    assert(list[2].name === "Alpaul Automobile Wash");
  });
});

describe("bestPlace", () => {
  it("break tie with review count", () => {
    const best = new FluentBusinesses(testData).fromCityInState("Charlotte", "NC").bestPlace();

    assert(best);
    assert(best.name === "China Garden");
  });
});

describe("hasStarsGeq", () => {
  it("filters correctly", () => {
    const list = new FluentBusinesses(testData).hasStarsGeq(4).getData();

    assert(list.length === 2);
    assert(list[0].name === "Applebee's");
    assert(list[1].name === "China Garden");
  });

  it("returns empty array if no businesses match criteria", () => {
    const list = new FluentBusinesses(testData).hasStarsGeq(5).getData();

    assert(list.length === 0);
  });
});

describe("inCategory", () => {
  it("filters correctly", () => {
    const list = new FluentBusinesses(testData).inCategory("Chinese").getData();

    assert(list.length === 1);
    assert(list[0].name === "China Garden");
  });

  it("returns an empty list if category is not found", () => {
    const list = new FluentBusinesses(testData).inCategory("Italian").getData();

    assert(list.length === 0);
  });

  it("handles businesses with no categories", () => {
    const businessWithNoCategory = {
      business_id: "xyz",
      name: "The Cat Cafe",
      city: "San Diego",
      state: "CA",
      stars: 4,
      review_count: 20,
    };
    const dataWithNoCategory = [...testData, businessWithNoCategory];
    const list = new FluentBusinesses(dataWithNoCategory).inCategory("Coffee").getData();

    assert(list.length === 0);
  });
});

describe("hasAmbience", () => {
  it("returns an empty list if none of the businesses have the ambience attribute", () => {
    const list = new FluentBusinesses(testData).hasAmbience("outdoors").getData();

    expect(list.length).toEqual(0);
  });

  it("returns empty array if no businesses match criteria", () => {
    const list = new FluentBusinesses(testData).hasAmbience("outdoors").getData();

    assert(list.length === 0);
  });
});

// describe("mostReviews", () => {
//   it("returns the business with the most reviews", () => {
//     const businesses: Business[] = [
//       {
//         business_id: "1",
//         name: "Business A",
//         city: "Charlotte",
//         state: "NC",
//         stars: 4,
//         review_count: 10,
//       },
//       {
//         business_id: "2",
//         name: "Business B",
//         state: "NC",
//         city: "Charlotte",
//         stars: 4,
//         review_count: 20,
//       },
//       {
//         business_id: "3",
//         name: "Business C",
//         state: "AZ",
//         city: "Phoenix",
//         stars: 3,
//         review_count: 5,
//       },
//       {
//         business_id: "4",
//         name: "Business D",
//         city: "Charlotte",
//         state: "NC",
//         stars: 3,
//         review_count: 30,
//       },
//     ];
//     const best = new FluentBusinesses(businesses).mostReviews();

//     assert(best);
//     assert(best.name === "Business D");
//   });

//   it("returns null if there are no businesses", () => {
//     const businesses: Business[] = [];
//     const best = new FluentBusinesses(businesses).mostReviews();

//     assert(!best);
//   });

//   it("returns the first business with the most reviews if there is a tie", () => {
//     const businesses: Business[] = [
//       {
//         business_id: "1",
//         name: "Business A",
//         city: "Charlotte",
//         state: "NC",
//         stars: 4,
//         review_count: 10,
//       },
//       {
//         business_id: "2",
//         name: "Business B",
//         state: "NC",
//         city: "Charlotte",
//         stars: 4,
//         review_count: 30,
//       },
//       {
//         business_id: "3",
//         name: "Business C",
//         state: "AZ",
//         city: "Phoenix",
//         stars: 3,
//         review_count: 30,
//       },
//       {
//         business_id: "4",
//         name: "Business D",
//         city: "Charlotte",
//         state: "NC",
//         stars: 3,
//         review_count: 20,
//       },
//     ];
//     const best = new FluentBusinesses(businesses).mostReviews();

//     assert(best);
//     assert(best.name === "Business B");
//   });
// });

describe("mostReviews", () => {
  it("returns the business with the most reviews", () => {
    const mostReviewed = new FluentBusinesses(testData).mostReviews();

    assert(mostReviewed);
    assert(mostReviewed.name === "Alpaul Automobile Wash");
  });

  it("returns undefined if called on an empty list", () => {
    const emptyList = new FluentBusinesses([]).mostReviews();

    assert(emptyList === undefined);
  });
});

describe("fromCityInState", () => {
  it("filters correctly", () => {
    const list = new FluentBusinesses(testData).fromCityInState("Charlotte", "NC").getData();

    expect(list.length).toEqual(3);
    expect(list[0].name).toEqual("Applebee's");
    expect(list[1].name).toEqual("China Garden");
    expect(list[2].name).toEqual("Alpaul Automobile Wash");
  });

  it("returns an empty list if no businesses match criteria", () => {
    const list = new FluentBusinesses(testData).fromCityInState("Raleigh", "NC").getData();

    expect(list.length).toEqual(0);
  });
});
