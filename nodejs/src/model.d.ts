export interface YGOData {
  data?: DataEntity[] | null;
}
export interface DataEntity {
  id: number;
  name: string;
  type: string;
  desc: string;
  race: string;
  archetype?: string | null;
  card_sets?: CardSetsEntity[] | null;
  card_images?: CardImagesEntity[] | null;
  card_prices?: CardPricesEntity[] | null;
  misc_info?: MiscInfoEntity[] | null;
  atk?: number | null;
  def?: number | null;
  level?: number | null;
  attribute?: string | null;
  banlist_info?: BanlistInfo | null;
  scale?: number | null;
  linkval?: number | null;
  linkmarkers?: string[] | null;
}
export interface CardSetsEntity {
  set_name: string;
  set_code: string;
  set_rarity: string;
  set_rarity_code: string;
  set_price: string;
}
export interface CardImagesEntity {
  id: number;
  image_url: string;
  image_url_small: string;
}
export interface CardPricesEntity {
  cardmarket_price: string;
  tcgplayer_price: string;
  ebay_price: string;
  amazon_price: string;
  coolstuffinc_price: string;
}
export interface MiscInfoEntity {
  beta_name?: string | null;
  views: number;
  viewsweek: number;
  upvotes: number;
  downvotes: number;
  formats?: (string | null)[] | null;
  tcg_date?: string | null;
  ocg_date?: string | null;
  konami_id?: number | null;
  has_effect?: number | null;
  beta_id?: number | null;
  treated_as?: string | null;
  staple?: string | null;
  question_atk?: number | null;
  question_def?: number | null;
}
export interface BanlistInfo {
  ban_ocg?: string | null;
  ban_goat?: string | null;
  ban_tcg?: string | null;
}
