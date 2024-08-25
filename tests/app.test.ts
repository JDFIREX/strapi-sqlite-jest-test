describe(`App`, () => {
  jest.setTimeout(50000)

  it("strapi is defined", async () => {
    const files = await strapi.db.query("plugin::upload.file").findMany()
    expect(strapi).toBeDefined()
  })
})
