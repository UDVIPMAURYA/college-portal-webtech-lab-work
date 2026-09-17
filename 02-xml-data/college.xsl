<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
    <html>
    <head>
        <title>College Data</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h2 { color: #003366; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 30px; }
            th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
            th { background-color: #003366; color: white; }
            tr:nth-child(even) { background-color: #f4f8fc; }
        </style>
    </head>
    <body>

        <h2>Courses</h2>
        <table>
            <tr>
                <th>Course ID</th>
                <th>Name</th>
                <th>Credits</th>
            </tr>
            <xsl:for-each select="college/course">
            <tr>
                <td><xsl:value-of select="@id"/></td>
                <td><xsl:value-of select="name"/></td>
                <td><xsl:value-of select="credits"/></td>
            </tr>
            </xsl:for-each>
        </table>

        <h2>Students</h2>
        <table>
            <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Enrolled Course</th>
            </tr>
            <xsl:for-each select="college/student">
            <tr>
                <td><xsl:value-of select="@rollNo"/></td>
                <td><xsl:value-of select="name"/></td>
                <td><xsl:value-of select="enrolledCourse"/></td>
            </tr>
            </xsl:for-each>
        </table>

    </body>
    </html>
</xsl:template>

</xsl:stylesheet>