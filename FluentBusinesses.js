export class FluentBusinesses {
    data;
    constructor(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
    fromCityInState(city, state) {
        const filteredData = this.data.filter(x => x.city === city && x.state === state);
        return new FluentBusinesses(filteredData);
    }
    hasStarsGeq(stars) {
        const filteredStars = this.data.filter(x => x.stars !== undefined && x.stars >= stars);
        return new FluentBusinesses(filteredStars);
    }
    inCategory(category) {
        const filteredCategory = [];
        this.data.forEach(x => {
            if (x.categories !== undefined) {
                x.categories.forEach(cat => {
                    if (cat.includes(category)) {
                        filteredCategory.push(x);
                    }
                });
            }
        });
        return new FluentBusinesses(filteredCategory);
    }
    hasHoursOnDays(days) {
        const filteredHours = this.data.filter(x => {
            const hours = x.hours;
            if (hours === undefined) {
                return false;
            }
            return days.map(day => hours.hasOwnProperty(day)).every(val => val);
        });
        return new FluentBusinesses(filteredHours);
    }
    hasAmbience(ambience) {
        const filteredAmbience = this.data.filter(x => {
            const businessAttributes = x.attributes;
            if (businessAttributes === undefined) {
                return false;
            }
            const ambienceObj = businessAttributes.Ambience;
            if (ambienceObj === undefined) {
                return false;
            }
            return ambienceObj.hasOwnProperty(ambience) && ambienceObj[ambience] === true;
        });
        return new FluentBusinesses(filteredAmbience);
    }
    // Using forEach  and initially checking if stars and reviews are defined or not
    bestPlace() {
        let bestBusiness = undefined;
        this.data.forEach((x) => {
            let stars;
            if (x.stars !== null && x.stars !== undefined) {
                stars = x.stars;
            }
            else {
                stars = -Infinity;
            }
            let reviews;
            if (x.review_count !== null && x.review_count !== undefined) {
                reviews = x.review_count;
            }
            else {
                reviews = -Infinity;
            }
            if (stars > (bestBusiness?.stars ?? -Infinity) ||
                (reviews > (bestBusiness?.review_count ?? -Infinity) && stars === (bestBusiness?.stars ?? -Infinity))) {
                bestBusiness = x;
            }
        });
        return bestBusiness;
    }
    mostReviews() {
        const business = this.data.slice(); // Make a copy of the original array
        const compareReviews = (a, b) => {
            let reviewsA;
            if (typeof a.review_count === "number") {
                reviewsA = a.review_count;
            }
            else {
                reviewsA = -Infinity;
            }
            let reviewsB;
            if (typeof b.review_count === "number") {
                reviewsB = b.review_count;
            }
            else {
                reviewsB = -Infinity;
            }
            let starsA;
            if (typeof a.stars === "number") {
                starsA = a.stars;
            }
            else {
                starsA = -Infinity;
            }
            let starsB;
            if (typeof b.stars === "number") {
                starsB = b.stars;
            }
            else {
                starsB = -Infinity;
            }
            if (reviewsA !== reviewsB) {
                return reviewsB - reviewsA; // Arranging review is order
            }
            else {
                return starsB - starsA; // Arrranging stars if review is equal
            }
        };
        business.sort(compareReviews); // Sort the businesses array using the compareReviews function
        return business[0]; // Return the first (highest-rated) business in the sorted array
    }
}
//# sourceMappingURL=FluentBusinesses.js.map