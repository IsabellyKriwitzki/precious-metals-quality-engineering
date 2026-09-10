# Quality Strategy

## 1. Objective

The goal of this independent demonstration is to show how I would approach quality for a digital precious-metals investment platform where **price accuracy, order integrity, authorization and transaction reliability** are business-critical.

This project is not affiliated with or based on the internal systems of any company.

## 2. Risk-based priorities

| Risk | Business impact | Priority | Primary coverage |
|---|---|---:|---|
| Incorrect metal price | Financial loss / customer trust | Critical | API + E2E + regression |
| Incorrect total calculation | Financial loss | Critical | API + UI |
| Duplicate/invalid order | Transaction integrity | Critical | API + E2E |
| Payment failure handled incorrectly | Financial/customer impact | High | API + E2E |
| Unauthorized order access | Privacy/security impact | Critical | API/security |
| Product unavailable | Customer experience | High | API + UI |
| UI formatting issue | Medium | Medium | UI/manual |
| Usability/exploration | Medium | Medium | Manual exploratory |

## 3. Test pyramid

- **API tests:** fast feedback for business rules, validation and authorization.
- **UI tests:** stable critical user journeys and visible behavior.
- **E2E tests:** a small number of high-value cross-layer journeys.
- **Manual exploratory testing:** new features, UX, unusual workflows and rapidly changing areas.

## 4. What I would automate

I would automate scenarios that are:

- repetitive;
- deterministic;
- business-critical;
- regression-prone;
- stable enough to maintain.

I would keep exploratory testing, usability evaluation and rapidly changing workflows primarily manual.

## 5. Critical business flow

**Product selection → current price → quantity → total calculation → payment → order creation → confirmation → portfolio/order history**

For dynamic pricing, I would additionally validate:

1. source price vs. API price;
2. API price vs. UI price;
3. price used in order calculation;
4. timestamp/freshness rules;
5. rounding and currency precision;
6. behavior when the price changes during checkout.

## 6. CI/CD proposal

```text
Git Push / Pull Request
        ↓
Install + Build
        ↓
API Smoke Tests
        ↓
UI Critical Tests
        ↓
Regression Suite
        ↓
HTML / Allure-style reporting
        ↓
Quality Gate
```

A real production setup would also include test environments, secrets management, test data strategy, service virtualization where appropriate, and monitoring of flaky tests.

## 7. Non-functional considerations

Depending on product requirements, I would also consider:

- performance testing for price/order endpoints;
- rate limiting and authentication;
- authorization boundaries;
- GDPR/privacy requirements;
- auditability of financial transactions;
- resilience when external price/payment services are unavailable.

## 8. Definition of Done from a QA perspective

A feature is ready when:

- acceptance criteria are covered;
- critical risks have appropriate test coverage;
- relevant automated checks pass;
- defects are triaged and resolved/accepted;
- regression impact is understood;
- observability/logging is sufficient for production support.
