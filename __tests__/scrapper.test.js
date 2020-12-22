const {getTitle, getDescription, getKeywords, getImages, getType, getSiteName} = require('../scrapper');

test('test og:title scrapping', () => {
    const html = `<html><meta property="og:title" content="Test Page"/></html>`;
    expect(getTitle(html)).toBe('Test Page');
});

test('test title scrapping', () => {
    const html = `<html><title>Test Page</title></html>`;
    expect(getTitle(html)).toBe('Test Page');
});

test('test og:description scrapping', () => {
    const html = `<html><meta property="og:description" content="Test description"/></html>`;
    expect(getDescription(html)).toBe('Test description');
});

test('test meta description scrapping', () => {
    const html = `<html><meta name="description" content="Test description"/></html>`;
    expect(getDescription(html)).toBe('Test description');
});

test('test meta description (ignore case) scrapping', () => {
    const html = `<html><meta name="Description" content="Test description"/></html>`;
    expect(getDescription(html)).toBe('Test description');
});

test('test meta keywords scrapping', () => {
    const html = `<html><meta name="keywords" content="This, is, a ,test"/></html>`;
    expect(getKeywords(html)).toStrictEqual(['This','is','a','test']);
});

test('test meta keywords (ignore case) scrapping', () => {
    const html = `<html><meta name="Keywords" content="This, is, a ,test"/></html>`;
    expect(getKeywords(html)).toStrictEqual(['This','is','a','test']);
});

test('test og:image scrapping', () => {
    const html = `<html><meta property="og:image" content="https://example.com/image1.png"/></html>`;
    expect(getImages(html)).toStrictEqual(['https://example.com/image1.png']);
});

test('test og:image (multiple) scrapping', () => {
    const html = `<html><meta property="og:image" content="https://example.com/image1.png"/>
                    <meta property="og:image" content="https://example.com/image2.png"/></html>`;
    expect(getImages(html)).toStrictEqual(['https://example.com/image1.png','https://example.com/image2.png']);
});

test('test og:type scrapping', () => {
    const html = `<html><meta property="og:type" content="website"/></html>`;
    expect(getType(html)).toBe('website');
});

test('test og:site_name scrapping', () => {
    const html = `<html><meta property="og:site_name" content="Example"/></html>`;
    expect(getSiteName(html)).toBe('Example');
});
