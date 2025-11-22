import { ReceiptElement, ReceiptTemplate } from '@pyyupsk/messenger-webhooks';
import { describe, it, expect } from 'vitest';

describe('ReceiptElement Tests', () => {
    it('should create a ReceiptElement with title and price', () => {
        const receiptElement = new ReceiptElement('Item A', 29.99);
        expect(receiptElement.title).toBe('Item A');
        expect(receiptElement.price).toBe(29.99);
    });

    it('should set subtitle correctly', () => {
        const receiptElement = new ReceiptElement('Item A', 29.99);
        receiptElement.setSubtitle('Subtitle');
        expect(receiptElement.subtitle).toBe('Subtitle');
    });

    it('should set quantity correctly', () => {
        const receiptElement = new ReceiptElement('Item A', 29.99);
        receiptElement.setQuantity(2);
        expect(receiptElement.quantity).toBe(2);
    });

    it('should set currency correctly', () => {
        const receiptElement = new ReceiptElement('Item A', 29.99);
        receiptElement.setCurrency('USD');
        expect(receiptElement.currency).toBe('USD');
    });

    it('should set image URL correctly', () => {
        const receiptElement = new ReceiptElement('Item A', 29.99);
        receiptElement.setImageUrl('https://example.com/image.jpg');
        expect(receiptElement.image_url).toBe('https://example.com/image.jpg');
    });

    it('should convert to JSON format correctly', () => {
        const receiptElement = new ReceiptElement('Item A', 29.99)
            .setSubtitle('Subtitle')
            .setQuantity(2)
            .setCurrency('USD')
            .setImageUrl('https://example.com/image.jpg');

        expect(receiptElement.toJSON()).toEqual({
            title: 'Item A',
            subtitle: 'Subtitle',
            quantity: 2,
            price: 29.99,
            currency: 'USD',
            image_url: 'https://example.com/image.jpg',
        });
    });
});

describe('ReceiptTemplate Tests', () => {
    it('should create a ReceiptTemplate with required fields', () => {
        const receiptTemplate = new ReceiptTemplate('John Doe', 'ORD12345', 'USD', 'Credit Card');
        expect(receiptTemplate.recipient_name).toBe('John Doe');
        expect(receiptTemplate.order_number).toBe('ORD12345');
        expect(receiptTemplate.currency).toBe('USD');
        expect(receiptTemplate.payment_method).toBe('Credit Card');
        expect(receiptTemplate.elements).toEqual([]);
        expect(receiptTemplate.summary).toEqual({ total_cost: 0 });
    });

    it('should set merchant name correctly', () => {
        const receiptTemplate = new ReceiptTemplate('John Doe', 'ORD12345', 'USD', 'Credit Card');
        receiptTemplate.setMerchantName('Merchant Inc.');
        expect(receiptTemplate.merchant_name).toBe('Merchant Inc.');
    });

    it('should set order URL correctly', () => {
        const receiptTemplate = new ReceiptTemplate('John Doe', 'ORD12345', 'USD', 'Credit Card');
        receiptTemplate.setOrderUrl('https://example.com/order');
        expect(receiptTemplate.order_url).toBe('https://example.com/order');
    });

    it('should set timestamp correctly', () => {
        const receiptTemplate = new ReceiptTemplate('John Doe', 'ORD12345', 'USD', 'Credit Card');
        const timestamp = Date.now();
        receiptTemplate.setTimestamp(timestamp);
        expect(receiptTemplate.timestamp).toBe(timestamp);
    });

    it('should set address correctly', () => {
        const receiptTemplate = new ReceiptTemplate('John Doe', 'ORD12345', 'USD', 'Credit Card');
        const address = {
            street_1: '123 Main St',
            city: 'Anytown',
            postal_code: '12345',
            state: 'CA',
            country: 'USA',
        };
        receiptTemplate.setAddress(address);
        expect(receiptTemplate.address).toEqual(address);
    });

    it('should set summary correctly', () => {
        const receiptTemplate = new ReceiptTemplate('John Doe', 'ORD12345', 'USD', 'Credit Card');
        const summary = {
            subtotal: 50,
            shipping_cost: 5,
            total_tax: 7,
            total_cost: 62,
        };
        receiptTemplate.setSummary(summary);
        expect(receiptTemplate.summary).toEqual(summary);
    });

    it('should add adjustments correctly', () => {
        const receiptTemplate = new ReceiptTemplate('John Doe', 'ORD12345', 'USD', 'Credit Card');
        const adjustments = [{ name: 'Discount', amount: -10 }];
        receiptTemplate.addAdjustment(adjustments);
        expect(receiptTemplate.adjustments).toEqual(adjustments);
    });

    it('should add elements correctly and enforce max limit', () => {
        const receiptTemplate = new ReceiptTemplate('John Doe', 'ORD12345', 'USD', 'Credit Card');
        const elements = Array.from(
            { length: 100 },
            (_, i) => new ReceiptElement(`Item ${i + 1}`, i + 1),
        );
        receiptTemplate.addElement(elements);
        expect(receiptTemplate.elements.length).toBe(100);

        // Should throw error when adding more than 100 elements
        const extraElement = new ReceiptElement('Extra Item', 100);
        expect(() => receiptTemplate.addElement([extraElement])).toThrow(
            'Receipt template supports a maximum of 100 elements',
        );
    });

    it('should convert to JSON format correctly', () => {
        const receiptTemplate = new ReceiptTemplate('John Doe', 'ORD12345', 'USD', 'Credit Card')
            .setMerchantName('Merchant Inc.')
            .setOrderUrl('https://example.com/order')
            .setTimestamp(Date.now())
            .setAddress({
                street_1: '123 Main St',
                city: 'Anytown',
                postal_code: '12345',
                state: 'CA',
                country: 'USA',
            })
            .setSummary({
                subtotal: 50,
                shipping_cost: 5,
                total_tax: 7,
                total_cost: 62,
            })
            .addAdjustment([{ name: 'Discount', amount: -10 }])
            .addElement([new ReceiptElement('Item A', 29.99)]);

        expect(receiptTemplate.toJSON()).toEqual({
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'receipt',
                    sharable: false,
                    recipient_name: 'John Doe',
                    merchant_name: 'Merchant Inc.',
                    order_number: 'ORD12345',
                    order_url: 'https://example.com/order',
                    currency: 'USD',
                    payment_method: 'Credit Card',
                    timestamp: expect.any(Number),
                    elements: [{ title: 'Item A', price: 29.99 }],
                    address: {
                        street_1: '123 Main St',
                        city: 'Anytown',
                        postal_code: '12345',
                        state: 'CA',
                        country: 'USA',
                    },
                    summary: {
                        subtotal: 50,
                        shipping_cost: 5,
                        total_tax: 7,
                        total_cost: 62,
                    },
                    adjustments: [{ name: 'Discount', amount: -10 }],
                },
            },
        });
    });
});
