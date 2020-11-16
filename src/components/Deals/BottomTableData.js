import Link from 'next/link'

const ResLink = props => <Link href={"/details?id=5fa61a355757c84e0f4082dc"}><a>{props.children}</a></Link>

export const BottomTableData = [
 {
  area_name: "Khulna", 
  head: [
   "RESTAURANT",
   "DEAL / PROMO CODE",
   "VALID FOR",
   "RESTAURVALIDITYANT",
  ],
  body: [
   [
   ( <ResLink href="#!">"Shaheen Sweets & Bakers"</ResLink>),
    "Flat 50% Off on entire menu",
    "New & Existing Customers",
    "1 SEP - 31 OCT 2020"
   ],
  ],
 },
 {
  area_name: "Kustia", 
  head: [
   "RESTAURANT",
   "DEAL / PROMO CODE",
   "VALID FOR",
   "RESTAURVALIDITYANT",
  ],
  body: [
   [
    ( <ResLink href="#!">"Shaheen Sweets & Bakers"</ResLink>),
    "Flat 50% Off on entire menu",
    "New & Existing Customers",
    "1 SEP - 31 OCT 2020"
   ],
   [
    ( <ResLink href="#!">"Shaheen Sweets & Bakers"</ResLink>),
    "Flat 50% Off on entire menu",
    "New & Existing Customers",
    "1 SEP - 31 OCT 2020"
   ],
  ],
 },
 {
  area_name: "Rampal", 
  head: [
   "RESTAURANT",
   "DEAL / PROMO CODE",
   "VALID FOR",
   "RESTAURVALIDITYANT",
  ],
  body: [
   [
    ( <ResLink href="#!">"Shaheen Sweets & Bakers"</ResLink>),
    "Flat 50% Off on entire menu",
    "New & Existing Customers",
    "1 SEP - 31 OCT 2020"
   ],
   [
    ( <ResLink href="#!">"Shaheen Sweets & Bakers"</ResLink>),
    "Flat 50% Off on entire menu",
    "New & Existing Customers",
    "1 SEP - 31 OCT 2020"
   ],
  ],
 }
 ]