# Test Plan — Purchase of Physical Gold

## Scope

Validate the critical purchase workflow for a 1 oz gold product.

## Functional scenarios

| ID | Scenario | Expected result | Type | Priority |
|---|---|---|---|---|
| TC-001 | Load gold product | Current product and price displayed | UI/API | P0 |
| TC-002 | Change quantity to 2 | Total equals unit price × 2 | UI/API | P0 |
| TC-003 | Create valid order | Order is confirmed | API/E2E | P0 |
| TC-004 | Quantity = 0 | Request rejected | API/UI | P0 |
| TC-005 | Quantity < 0 | Request rejected | API | P0 |
| TC-006 | Payment declined | No order is confirmed | API | P0 |
| TC-007 | Unknown product | 404 returned | API | P1 |
| TC-008 | Unauthorized order access | 403 returned | API/security | P0 |
| TC-009 | Price changes during checkout | Business rule is respected | Exploratory/E2E | P0 |
| TC-010 | Currency rounding | Total is financially accurate | API/UI | P0 |

## Exploratory charter

**Mission:** Explore price/order consistency under changing conditions.

Questions:
- What happens if the displayed price changes immediately before order submission?
- Is the order stored with the exact price used for calculation?
- Are rounding rules consistent between UI and backend?
- What happens after network interruption?
- Can repeated clicks create duplicate orders?
- Does refreshing the page preserve or reset the intended state?
