// export interface CryptoCurrency {
//     Id:                 string;
//     Name:               string;
//     FullName:           string;
//     Internal:           string;
//     ImageUrl:           string;
//     Url:                string;
//     Algorithm:          string;
//     ProofType:          string;
//     Rating:             Rating;
//     NetHashesPerSecond: number;
//     BlockNumber:        number;
//     BlockTime:          number;
//     BlockReward:        number;
//     AssetLaunchDate:    Date;
//     MaxSupply:          number;
//     Type:               number;
//     DocumentType:       string;
// }

// export interface Rating {
//     Weiss: Weiss;
// }

// export interface Weiss {
//     Rating:                   string;
//     TechnologyAdoptionRating: string;
//     MarketPerformanceRating:  string;
// }

// // Converts JSON strings to/from your types
// export class Convert {
//     public static toCryptoCurrency(json: string): CryptoCurrency {
//         console.log(json)
//         return JSON.parse(json);
//     }

//     public static cryptoCurrencyToJson(value: CryptoCurrency): string {
//         return JSON.stringify(value);
//     }
// }